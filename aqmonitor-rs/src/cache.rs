//! Small bounded TTL cache. Keys derive from user input, so the size cap is a security control:
//! without it a client could grow memory on the Pi without limit by requesting many cities.

use std::{
    collections::HashMap,
    sync::Mutex,
    time::{Duration, Instant},
};

pub struct TtlCache<V> {
    entries: Mutex<HashMap<String, (Instant, V)>>,
    ttl: Duration,
    capacity: usize,
}

impl<V: Clone> TtlCache<V> {
    pub fn new(ttl: Duration, capacity: usize) -> Self {
        Self {
            entries: Mutex::new(HashMap::new()),
            ttl,
            capacity: capacity.max(1),
        }
    }

    pub fn get(&self, key: &str) -> Option<V> {
        self.get_at(key, Instant::now())
    }

    pub fn insert(&self, key: String, value: V) {
        self.insert_at(key, value, Instant::now());
    }

    fn get_at(&self, key: &str, now: Instant) -> Option<V> {
        let mut map = self.lock();
        match map.get(key) {
            Some((stored, v)) if now.saturating_duration_since(*stored) < self.ttl => {
                Some(v.clone())
            }
            Some(_) => {
                map.remove(key);
                None
            }
            None => None,
        }
    }

    fn insert_at(&self, key: String, value: V, now: Instant) {
        let mut map = self.lock();
        if map.len() >= self.capacity && !map.contains_key(&key) {
            let ttl = self.ttl;
            map.retain(|_, (stored, _)| now.saturating_duration_since(*stored) < ttl);
            if map.len() >= self.capacity {
                // Still full of live entries: evict the oldest one.
                if let Some(oldest) = map
                    .iter()
                    .min_by_key(|(_, (t, _))| *t)
                    .map(|(k, _)| k.clone())
                {
                    map.remove(&oldest);
                }
            }
        }
        map.insert(key, (now, value));
    }

    #[cfg(test)]
    fn len(&self) -> usize {
        self.lock().len()
    }

    /// A poisoned lock only means another thread panicked mid-insert; the map is still usable.
    fn lock(&self) -> std::sync::MutexGuard<'_, HashMap<String, (Instant, V)>> {
        self.entries.lock().unwrap_or_else(|e| e.into_inner())
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn returns_value_until_ttl_then_expires() {
        let c = TtlCache::new(Duration::from_secs(10), 8);
        let t0 = Instant::now();
        c.insert_at("k".into(), 1, t0);
        assert_eq!(c.get_at("k", t0 + Duration::from_secs(9)), Some(1));
        assert_eq!(c.get_at("k", t0 + Duration::from_secs(10)), None);
        assert_eq!(c.len(), 0, "expired entry is removed on read");
    }

    #[test]
    fn never_exceeds_capacity_and_evicts_oldest() {
        let c = TtlCache::new(Duration::from_secs(1000), 3);
        let t0 = Instant::now();
        for (i, k) in ["a", "b", "c", "d", "e"].iter().enumerate() {
            c.insert_at((*k).into(), i, t0 + Duration::from_secs(i as u64));
            assert!(c.len() <= 3);
        }
        assert_eq!(c.get_at("a", t0 + Duration::from_secs(5)), None);
        assert_eq!(c.get_at("b", t0 + Duration::from_secs(5)), None);
        assert_eq!(c.get_at("e", t0 + Duration::from_secs(5)), Some(4));
    }

    #[test]
    fn overwriting_existing_key_does_not_evict() {
        let c = TtlCache::new(Duration::from_secs(1000), 2);
        let t0 = Instant::now();
        c.insert_at("a".into(), 1, t0);
        c.insert_at("b".into(), 2, t0);
        c.insert_at("a".into(), 3, t0);
        assert_eq!(c.len(), 2);
        assert_eq!(c.get_at("b", t0), Some(2));
        assert_eq!(c.get_at("a", t0), Some(3));
    }
}

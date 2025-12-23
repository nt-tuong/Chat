// Async storage wrapper using localStorage
const asyncStorage = {
  async get(key: string): Promise<{ value: string } | null> {
    try {
      const value = localStorage.getItem(key);
      return value ? { value } : null;
    } catch (error) {
      console.error("Storage GET error:", error);
      return null;
    }
  },

  async set(key: string, value: string): Promise<void> {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error("Storage SET error:", error);
      throw error;
    }
  },

  async delete(key: string): Promise<void> {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Storage DELETE error:", error);
      throw error;
    }
  },
};

interface RedisHash {
  [field: string]: string | number;
}

class RedisSimulator {
  async set(
    key: string,
    field: string,
    value: string | number
  ): Promise<string | null> {
    try {
      const data = await this.getAll(key);
      data[field] = value;
      await asyncStorage.set(key, JSON.stringify(data));
      return "OK";
    } catch (error) {
      console.error("Redis set error:", error);
      return null;
    }
  }

  async get(key: string, field: string): Promise<string | null> {
    try {
      const data = await this.getAll(key);
      const value = data[field];
      return value !== undefined ? String(value) : null;
    } catch (error) {
      console.error("Redis get error:", error);
      return null;
    }
  }

  async getAll(key: string): Promise<RedisHash> {
    try {
      const result = await asyncStorage.get(key);
      if (!result) {
        return {};
      }
      return JSON.parse(result.value) as RedisHash;
    } catch (error) {
      console.error("Redis getAll error:", error);
      return {};
    }
  }

  async delete(key: string, field: string): Promise<number> {
    try {
      const data = await this.getAll(key);
      if (!(field in data)) {
        return 0;
      }
      delete data[field];
      if (Object.keys(data).length === 0) {
        await asyncStorage.delete(key);
      } else {
        await asyncStorage.set(key, JSON.stringify(data));
      }
      return 1;
    } catch (error) {
      console.error("Redis delete error:", error);
      return 0;
    }
  }

  async del(key: string): Promise<number> {
    try {
      await asyncStorage.delete(key);
      return 1;
    } catch (error) {
      console.error("Redis DEL error:", error);
      return 0;
    }
  }

  async incrementBy(
    key: string,
    field: string,
    increment: number
  ): Promise<number> {
    try {
      const data = await this.getAll(key);
      const currentValue = parseInt(String(data[field] || 0), 10);
      const newValue = currentValue + increment;
      data[field] = newValue;
      await asyncStorage.set(key, JSON.stringify(data));
      return newValue;
    } catch (error) {
      console.error("Redis incrementBy error:", error);
      return 0;
    }
  }
}

export default new RedisSimulator();

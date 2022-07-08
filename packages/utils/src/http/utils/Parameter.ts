import { Pair } from "./Pair";

export class Parameter {
  private list: Array<Pair<string, string>> = [];

  add(name: string, value: ValueType): this {
    this.list.push(new Pair(name, value?.toString() ?? ""));
    return this;
  }

  put(name: string, value: ValueType): this {
    const target = this.list.find((pair) => pair.name === name);
    if (target) {
      target.value = value?.toString() ?? "";
    } else {
      this.add(name, value);
    }
    return this;
  }

  addObject = (params: Record<string, any>): this => {
    Object.entries(params).forEach(([name, value]) => {
      if (this.isArray(value)) {
        value.forEach((item) => {
          this.add(name, item);
        });
      } else {
        this.add(name, value);
      }
    });
    return this;
  };

  putObject = (params: Record<string, any>): this => {
    Object.entries(params).forEach(([name, value]) => {
      if (this.isArray(value)) {
        this.put(name, value.join(","));
      } else {
        this.put(name, value);
      }
    });
    return this;
  };

  toString(isShouldEncode = false, encoder = encodeURIComponent): string {
    const encode = (val: string) => (isShouldEncode ? encoder(val) : val);
    return this.list
      .map((param) => [encode(param.name), encode(param.value)])
      .map((param) => param.join("="))
      .join("&");
  }

  toObject(): Record<string, string> {
    return this.list.reduce(
      (acc, pair) => ({ ...acc, [pair.name]: pair.value }),
      {}
    );
  }

  private isArray(value: unknown): value is any[] {
    return Array.isArray(value) && value.length > 0;
  }
}

type ValueType = string | number | boolean | null | undefined;

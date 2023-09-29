class LocalStorage {
  setData = (key: string, value: any) => {
    const data = JSON.stringify({ [key]: value });
    window.localStorage.setItem(key, data);
  };

  getData = (key: string) => {
    const data = window.localStorage.getItem(key);

    if (!data) {
      return undefined;
    }

    const parsedData = JSON.parse(data);

    return parsedData[key];
  };

  deleteData = (key: string) => {
    window.localStorage.setItem(key, "");
  };
}

const localStore = new LocalStorage();

export { localStore };

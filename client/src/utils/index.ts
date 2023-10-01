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

const repeatWithIntervals = (
  callback: (nthCb: number) => any,
  interval: number,
  repeatTimes: number
) => {
  let count = 0;

  function runCallback() {
    callback(count);
    count++;

    if (count < repeatTimes) {
      setTimeout(runCallback, interval * 1000);
    }
  }

  if (repeatTimes > 0) {
    runCallback(); // Call the first callback immediately
  }
};

export { localStore, repeatWithIntervals };

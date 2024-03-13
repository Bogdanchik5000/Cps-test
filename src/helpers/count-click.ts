import { ClickStore } from "../store/click.store";

function countClick(store: ClickStore) {
  store.incrClicks();

  if (store.isActive) return;
  store.toggle("isActive");

  const intervalId = setInterval(() => {
    store.decrTimer();
    if (+store.timer === 0) {
      store.toggle("isActive");
      store.toggle("isTimerEnd");
      clearInterval(intervalId);
    }
  }, 10);
}

export default countClick;

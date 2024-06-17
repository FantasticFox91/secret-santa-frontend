export default defineNuxtPlugin(() => {
  const current = reactive({
    name: "",
    resolve: null,
    reject: null,
    scrollPosition: 0,
  });

  const closeModal = () => {
    current.name = "";
    setTimeout(() => {
      document.body.classList.remove("scroll-lock");
      window.scrollTo(0, +current.scrollPosition);
      document.querySelector('.footer').style.paddingRight = 0;
      document.body.style.top = null;
      document.removeEventListener("keydown", handleKeyDown);
    }, 500);
  };

  const saveScrollPosition = () => {
    current.scrollPosition = window.scrollY;
  }

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  };

  const getScrollbarWidth = () => {
    return window.innerWidth - document.documentElement.clientWidth;
  }

  const modals = {
    active() {
      return current.name;
    },
    show(name) {
      current.name = name;
      saveScrollPosition();
      document.body.style.top = `-${current.scrollPosition}px`;
      if (getScrollbarWidth()) {
        document.querySelector('.footer').style.paddingRight = `${getScrollbarWidth()}px`;
      }
      document.body.classList.add("scroll-lock");
      document.addEventListener("keydown", handleKeyDown);
      return new Promise((resolve = () => {}, reject = () => {}) => {
        current.resolve = resolve;
        current.reject = reject;
      });
    },
    accept() {
      current.resolve();
      closeModal();
    },
    cancel() {
      current.reject();
      closeModal();
    },
    close() {
      closeModal()

    }
  }

  return {
    provide: { modals },
  };
})

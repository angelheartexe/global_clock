// <global-clock> — a plain text box showing the visitor's local time.
// The time zone comes from the visitor's browser, so everyone sees their own time.
//
// Optional attributes:
//   seconds    show seconds              <global-clock seconds></global-clock>
//   zone       append the time zone name <global-clock zone></global-clock>
//   hour12     force 12-hour ("true") or 24-hour ("false"); default follows the visitor's locale
class GlobalClock extends HTMLElement {
  static observedAttributes = ["seconds", "zone", "hour12"];

  constructor() {
    super();
    const root = this.attachShadow({ mode: "open" });
    root.innerHTML = `
      <style>
        :host {
          display: inline-block;
          font-family: var(--clock-font, "Grotesque L", "Grotesque", "Neue Haas Grotesk Display", "Helvetica Neue", Arial, sans-serif);
          font-weight: var(--clock-weight, 300);
          font-size: var(--clock-size, 17pt);
          font-variant-numeric: tabular-nums;
          color: inherit;
        }
      </style>
      <time part="time"></time>`;
    this.timeEl = root.querySelector("time");
  }

  connectedCallback() {
    this.buildFormatter();
    this.tick();
  }

  disconnectedCallback() {
    clearTimeout(this.timer);
  }

  attributeChangedCallback() {
    if (!this.isConnected) return;
    this.buildFormatter();
    this.render();
  }

  buildFormatter() {
    const hour12 = this.getAttribute("hour12");
    this.formatter = new Intl.DateTimeFormat(undefined, {
      hour: "numeric",
      minute: "2-digit",
      ...(this.hasAttribute("seconds") && { second: "2-digit" }),
      ...(this.hasAttribute("zone") && { timeZoneName: "short" }),
      ...(hour12 !== null && { hour12: hour12 !== "false" }),
    });
  }

  render() {
    const now = new Date();
    this.timeEl.textContent = this.formatter.format(now);
    this.timeEl.dateTime = now.toISOString();
  }

  // Re-render exactly on each second boundary so the display never lags.
  // Re-reading the time zone each tick also picks up DST changes and travel.
  tick() {
    this.render();
    this.timer = setTimeout(() => this.tick(), 1000 - (Date.now() % 1000));
  }
}

customElements.define("global-clock", GlobalClock);

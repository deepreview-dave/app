import mixpanel from "mixpanel-browser";

enum AnalyticsEventName {
  LOADED = "loaded",
  GENERATED = "generated",
  EXPANDED = "expanded",
  COPIED = "copied",
}

export type GeneratedAnalyticsParams = {
  hasSetRole: boolean;
  hasSetDepartment: boolean;
  hasSetPeriod: boolean;
  hasSetNumberOfAttributes: number;
};

export class Analytics {
  private static isInitiialised = false;

  static init(key: string | undefined, debug = false) {
    if (!key) {
      console.error("Mixpanel key not found!");
      return;
    }

    if (!Analytics.isInitiialised) {
      mixpanel.init(key, { debug });
      Analytics.isInitiialised = true;
    }
  }

  static loaded() {
    mixpanel.track(AnalyticsEventName.LOADED);
  }

  static generated() {
    mixpanel.track(AnalyticsEventName.GENERATED);
  }

  static expanded() {
    mixpanel.track(AnalyticsEventName.EXPANDED);
  }

  static copied() {
    mixpanel.track(AnalyticsEventName.COPIED);
  }
}

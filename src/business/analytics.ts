import mixpanel from "mixpanel-browser";

enum AnalyticsEventName {
  LOADED = "loaded",
  GENERATED = "generated",
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

  static init(key: string, debug = true) {
    if (!Analytics.isInitiialised) {
      mixpanel.init(key, { debug });
      Analytics.isInitiialised = true;
    }
  }

  static loaded() {
    mixpanel.track(AnalyticsEventName.LOADED);
  }

  static generated(params: GeneratedAnalyticsParams) {
    mixpanel.track(AnalyticsEventName.GENERATED, params);
  }

  static copied() {
    mixpanel.track(AnalyticsEventName.COPIED);
  }
}

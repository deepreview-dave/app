import mixpanel from "mixpanel-browser";

enum AnalyticsEventName {
  LOADED = "loaded",
  GENERATED = "generated",
  EXPANDED = "expanded",
  COPIED = "copied",
  TOOL = "tool",
  DOWNLOAD = "download",
}

export enum AnalyticsToolName {
  PERF_REVIEW = "performance_review",
  COVER_LETTER = "cover_letter",
  REFERRAL_LETTER = "referral_letter",
  RESUME = "resume",
  PRAISE = "praise",
  RESIGNATION = "resignation_letter",
  COMPENSATION = "compensation",
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

  static tool(tool: AnalyticsToolName) {
    mixpanel.track(AnalyticsEventName.TOOL, { tool });
  }

  static download() {
    mixpanel.track(AnalyticsEventName.DOWNLOAD);
  }
}

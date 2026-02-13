export interface Actionable {
  main: () => Promise<void>;
}

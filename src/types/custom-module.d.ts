declare module "@storybook/addon-actions" {
  export function action(message: string): any;
}

declare module 'storybook-addon-specifications' {
  export function specs(fn: () => void): void;
  export function describe(name: string, fn: () => void): void;
  export function it(testName: string, fn: () => void): void;
}

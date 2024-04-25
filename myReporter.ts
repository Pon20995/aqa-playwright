import type {
  FullConfig,
  FullResult,
  Reporter,
  Suite,
  TestCase,
  TestResult,
} from "@playwright/test/reporter";

class MyReporter implements Reporter {
  onBegin(config: FullConfig, suite: Suite) {
    console.log(`Testing started at \x1b[36m${new Date()}\x1b[0m`);
    console.log(`Total test count: \x1b[1m${suite.allTests().length}\x1b[0m`);
  }

  onTestBegin(test: TestCase, result: TestResult) {
    console.log(`Starting test ${test.title}`);
  }

  onTestEnd(test: TestCase, result: TestResult) {
    if (result.status === "skipped") {
      console.log(
        `Finished test ${test.title}: \x1b[33m${result.status}\x1b[0m`
      );
    } else if (result.status === "failed") {
      console.log(
        `Finished test ${test.title}: \x1b[31m${result.status}\x1b[0m`
      );
    } else {
      console.log(
        `Finished test ${test.title}: \x1b[32m${result.status}\x1b[0m`
      );
    }
  }

  onEnd(result: FullResult) {
    console.log(`Finished the run: \x1b[36m${result.status}\x1b[0m`);
    console.log(`Total duration: ${result.duration} ms`);
  }
}

export default MyReporter;

class AnalyzerController {
  constructor() {
    //initalize the analyzer with the items indexA
    this.analyzer = {};
    this.getType = () => {
      if (this.analyzer.indexAnalyzer || this.analyzer.queryAnalyzer) {
        return 'separate';
      }
      else {
         return 'indexquery';
      }
    };
  }
}
export {AnalyzerController};


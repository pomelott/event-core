import {EventCore} from "../../../scripts/eventCore";

export default () => {
  describe('[eventCore unit-test] function gc', () => {
    let core = new EventCore;
    core.on('pe->basketball', () => {return 'pe->basketball task1'});
    core.on('pe->basketball->shooting', () => {return 'pe->basketball->shooting task1'});
    core.on('pe->football', () => {return 'pe->football task1'});
    core.on('pe', () => {return 'pe task1'})
    test('[unit-item] trigger after gc', () => {
      core.gc('pe->football');
      core.triggerTree('pe').then((msg) => {
        expect(msg).toStrictEqual([
          ['pe task1'],
          ['pe->basketball task1'],
          ['pe->basketball->shooting task1']
        ])
        core.gc('pe->basketball');
        core.triggerTree('pe').then((msg) => {
          expect(msg).toStrictEqual([
            ['pe task1']
          ])
        })
      })
    })
  })
}
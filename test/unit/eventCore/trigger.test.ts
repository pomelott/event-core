import {EventCore} from '../../../scripts/eventCore';
export default () => {
  let core = new EventCore();

  core.on('pe', () => {return 'pe task1'});
  core.on('pe', () => {return 'pe task2'});
  core.on('pe', () => {return 'pe task3'});
  core.on('pe->football', () => {return 'pe->football task1'});
  core.on('pe->basketball', () => {return 'pe->basketball task1'});
  core.on('pe->basketball->shooting', () => {return 'pe->basketball->shooting task1'});
  describe('[eventCore unit-test] function trigger & triggerTree & once', () => {
    test('[unit-item] trigger a event with several binding-functions', () => {
      core.trigger('pe').then((msg) => {
        expect(msg).toStrictEqual(['pe task1', 'pe task2', 'pe task3']);
      })
    })

    test('[unit-item] trigger a event which bind with a tree shape', () => {
      core.trigger('pe->football').then((msg) => {
        expect(msg).toStrictEqual(['pe->football task1'])
      })
    })

    test('[unit-item] trigger a eventTree', () => {
      core.triggerTree('pe').then((msg) => {
        expect(msg).toStrictEqual([
          [ 'pe task1', 'pe task2', 'pe task3' ],
          [ 'pe->football task1' ],
          [ 'pe->basketball task1' ],
          [ 'pe->basketball->shooting task1' ]
        ])
      });
    })

    test('[unit-item] trigger a deeper eventTree', () => {
      core.triggerTree('pe->basketball').then((msg) => {
        expect(msg).toStrictEqual([
          [ 'pe->basketball task1' ],
          [ 'pe->basketball->shooting task1' ]
        ])
      });
    })

    test('[unit-item] trigger a event once', () => {
      core.once('pe->basketball').then((a) => {
        core.trigger('pe->basketball').then((msg) => {
          expect(msg).toStrictEqual([]);
        })
      })
    })

    test(`[unit-item] trigger a event that doesn't exist`, () => {
      core.trigger('pe->tennis').catch((err) => {
        expect(err).toEqual(new TypeError(`Cannot read property 'pipe' of undefined`))
      })
    })
  })

}
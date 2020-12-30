import {EventCore} from '../../../scripts/eventCore';
import { EventTree } from '../../../types/eventCore';
export default () => {
  describe('[eventCore unit-test] function getTree & getPipe', () => {
    let core = new EventCore,
        tree: EventTree,
        pipePe: any, pipePeBasketball: any, pipePeBasketballShooting: any, pipePeFootballDefence: any, pipeMath: any, pipeMathCalculate: any;
    function fnPe () {return 'pe task1'};
    function fnPeBasketball () {return 'pe->basketball task1'};
    function fnPeBasketballShooting () {return 'pe->basketball->shooting task1'};
    function fnPeFootballDefence () {return 'pe->football->defence task1'};
    function fnMath () {return 'math task1'};
    function fnMathCalculate () {return 'math->calculate task1'};
    pipePe = core.on('pe', fnPe)[0];
    core.on('pe->basketball', fnPeBasketball)
    pipePeBasketball = core.getPipe('pe->basketball');
    pipePeFootballDefence = core.on('pe->football->defence', fnPeFootballDefence)[0];
    pipePeBasketballShooting = core.on('pe->basketball->shooting', fnPeBasketballShooting)[0];
    pipeMathCalculate = core.on('math->calculate', fnMathCalculate)[0];
    core.on('math', fnMath);
    pipeMath = core.getPipe('math');

    tree = core.getTree();

    test('[unit-item] get a tree that has several forks', () => {
      expect(tree).toStrictEqual({
        pe: {
          pipe: pipePe,
          tree: {
            basketball: {
              pipe: pipePeBasketball,
              tree: {
                shooting: {
                  pipe: pipePeBasketballShooting
                }
              }
            },
            football: {
              tree: {
                defence: {
                  pipe: pipePeFootballDefence
                }
              }
            }
          }
        },
        math: {
          pipe: pipeMath,
          tree: {
            calculate: {
              pipe: pipeMathCalculate
            }
          }
        }
      })
    })
  })
}
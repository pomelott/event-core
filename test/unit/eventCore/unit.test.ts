import {EventCore} from '../../../scripts/eventCore';
import {jsonString} from '../../../scripts/lib';
export default () => {
  let core = new EventCore();
  describe('[unit] event-core', () =>{
    core.config({
      maxListeners: 5
    })
    test('[unit-item] eventCore config', () => {
      expect(jsonString(core.getConfig())).toBe(jsonString({
        maxListeners: 5
      }))
    })

    test('[unit-item] eventCore on', () => {
      core.on('math->calculate', () => {
        return 'exec math calculate';
      })
      core.on('math->calculate', () => {
        return 'exec math calculate twice';
      })
      core.on('math', () => {
        return 'exec math';
      })
    })

    test('[unit-item] eventCore gc', () => {
      core.gc('math->calculate');
      core.on('math->calculate', () => {
        return 'exec math calculate after gc';
      })
    })

    test('[unit-item] eventCore trigger', () => {
      core.trigger('math').then((msg) => {
        expect(msg).toStrictEqual(['exec math'])
      })
      core.trigger('math->calculate').then((msg) => {
        expect(msg).toStrictEqual(['exec math calculate after gc'])
      })
    })

    test('[unit-item] event-item once', () => {
      core.once('math').then((msg) => {
        expect(msg).toStrictEqual(['exec math'])
      })
      core.once('math').then((msg) => {
        expect(msg).toStrictEqual([])
      })
    })
  })
}
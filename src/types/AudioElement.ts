/* HTMLAudioElement extends HTMLMediaElement. setSinkId doesn't work for mobile devices.
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/setSinkId
 */

export default interface AudioElement extends HTMLAudioElement {
  setSinkId: ((id: string) => void) | undefined;
}

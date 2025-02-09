// Original version: https://www.richardn.ca/posts/SveltKitToastMessages/#toastmanagerts
// Author: RichardN
//
// Changes by Mario Alviano
// - handle multiple managers
// - single exported method


import { writable, type Writable } from "svelte/store";
export const toasts: Writable<NlpToastMessage[]> = writable([]);

export class NlpToastMessage {
  public id: number = -1;
  constructor(
    private _manager: ToastManager,
    public title: string,
    public body: string | undefined,
    public color: string,
    public autoHide: boolean = false,
    public position: string,
  ) {}
  setId = (id: number) => (this.id = id);
  dismiss = () => this._manager.dismiss(this);
}

class ToastManager {
  public toasts: NlpToastMessage[] = [];
  private _toastId: number = 0;
  constructor(private _toasts: Writable<NlpToastMessage[]>) {}
  add = (toast: NlpToastMessage) => {
    toast.setId(this._toastId++);
    this.toasts.push(toast);
    this._toasts.set(this.toasts);
  };
  dismiss = (toast: NlpToastMessage) => {
    let idx = this.toasts.indexOf(toast);
    this.toasts.splice(idx, 1);
    this._toasts.set(this.toasts);
  };
}

const manager = new ToastManager(toasts);

export const toast = (
  position: string,
  color: string,
  title: string,
  body: string | undefined = undefined,
  autoHide: boolean = true,
) =>
  manager.add(new NlpToastMessage(manager, title, body, color, autoHide, position));

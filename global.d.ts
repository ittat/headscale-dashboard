

declare global {

  interface Window {
    showGlobalSpinner: ()=>void,
    hideGlobalSpinner: ()=>void,
    showDialog: (props:IGobalDialogProps) => void,
    hideDialog: () => void
  }
}

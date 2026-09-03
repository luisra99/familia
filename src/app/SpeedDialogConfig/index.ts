import { FilePresent, HelpCenter } from "@mui/icons-material";

import { ISpeedDialActions } from "@/_pwa-framework/speedDial/types";

export const actions: ISpeedDialActions = [

  {
    icon: FilePresent,
    name: "Estado de la caracterización",
    action: () => console.log("Estado de la caracterización"),
    modal: "estadoEntrevista",
  },
];

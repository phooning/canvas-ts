import { ReactNode } from "react";
import { UObj } from "../utils";

export interface ICanvasConfig {
  enableInteractionType?: "Mouse" | "Trackpad";
  enableNodeFormatType?: "Horizontal" | "Vertical";
  enableLinkType?: "Curve" | "Elbow" | "Straight";
  enableLinkDirection?: "LeftRight" | "TopBottom" | "BottomTop";
  enableLinkSelection?: "None" | "LinkOnly" | "Handles" | "Detachable";
  enableLinkReplaceOnNewConnection?: boolean;
  enableInternalObjectModel?: boolean;
  enablePaletteLayout?: "Model" | "Flyout" | "None";
  enableToolbarLayout?: "Top" | "None";
  enableResizableNodes?: boolean;
  enableInsertNodeDroppedOnLink?: boolean;
  enableRightFlyoutUnderToolbar?: boolean;
  enablePositionNodeOnRightFlyoutOpen?: boolean;
  enableHighlightUnavailableNodes?: boolean;
  enableHighlightNodeOnNewLinkDrag?: boolean;
  enableAutoLinkOnlyFromSelNodes?: boolean;
  enableExternalPipelineFlows?: boolean;
  enableMoveNodesOnSupernodeResize?: boolean;
  enableDisplayFullLabelOnHover?: boolean;
  enableSingleOutputPortDisplay?: boolean;
  enableDragWithoutSelect?: boolean;
  enableDragToMoveSizeNodesComments?: boolean;
  enableEditingActions?: boolean;
  enableStateTag?: "None" | "ReadOnly" | "Locked";
  enableDropZoneOnExternalDrag?: boolean;
  enableNodeLayout?: {
    selectionPath?: "";
    bodyPath?: "";
    labelPosY?: number;
  };
  enableSaveZoom?: "LocalStorage" | "None" | "PipelineFlow";
  enablePanIntoViewOnOpen?: boolean;
  enableZoomIntoSubFlows?: boolean;
  enableSnapToGridType?: "During" | "None" | "After";
  enableSnapToGridX?: string;
  enableSnapToGridY?: string;
  enableAutoLayoutVerticalSpacing?: string;
  enableAutoLayoutHorizontalSpacing?: string;
  enableAssocLinkCreation?: boolean;
  enableAssocLinkType?: "Straight" | "RightSideCurve";
  enableBrowserEditMenu?: boolean;
  enableNarrowPalette?: boolean;
  emptyCanvasContent?: ReactNode;
  dropZoneCanvasContent?: ReactNode;
  schemaValidation?: boolean;
  tipConfig?: {
    palette?: boolean;
    nodes?: boolean;
    ports?: boolean;
    links?: boolean;
    decorations?: boolean;
    stateTag?: boolean;
  };
}

export interface IToolbarActionItem {
  action?: string;
  label?: string;
  enable?: boolean;
  iconEnabled?: string;
  iconDisabled?: string;
  incLabelWithIcon?: string;
  kind?: string;
  tooltip?: string;
  isSelected?: boolean;
  jsx?: ReactNode;
  divider?: boolean;
}

export interface IToolbarConfig {
  leftBar: IToolbarActionItem[];
  rightBar: IToolbarActionItem[];
  overrideAutoEnableDisable: boolean;
}

export interface INotificationConfig {
  action: string;
  label: string;
  enable: boolean;
  notificationHeader: string;
  notificationSubtitle: string;
  emptyMessage: string;
  clearAllMessage: string;
  keepOpen: boolean;
  clearAllCallback: () => void;
}

export interface ICtxMenuConfig {
  enableCreateSupernodeNonContiguous: boolean;
  defaultMenuEntries: {
    saveToPalette: boolean;
    createSupernode: boolean;
    displaySupernodeFullPage: boolean;
    colorBackground: boolean;
  };
}

export type T2dPos = { x: number; y: number };
export interface ICtxMenuHandlerSource {
  addBreadcrumbs: null;
  cmPos: T2dPos;
  id: null;
  mousePos: T2dPos;
  port: undefined;
  selectedObjectIds: unknown[];
  pipelineId: string;
  type: "canvas";
  zoom: number;
}

export interface ICtxMenuHandlerDefaultMenuAction {
  action?: string;
  label?: string;
  divider?: boolean;
  submenu?: boolean;
  enable?: boolean;
}

export interface IEditActionData {
  editType:
    | "createComment"
    | "createNode"
    | "moveObjects"
    | "linkNodes"
    | "linkComment"
    | "resizeObjects"
    | "editComment"
    | "expandSuperNodeInPlace"
    | "displaySubPipeline"
    | "displayPreviousPipeline";
  editSource: "contextmenu" | "toolbar" | "keyboard" | "canvas";
  selectedObjects: UObj[];
  selectedObjectIds: string[];
  offsetX: number;
  offsetY: number;
}

export interface IEditActionCommand {
  command: UObj;
}

export interface IClickActionSource {
  clickType: "DOUBLE_CLICK" | "SINGLE_CLICK" | "SINGLE_CLICK_CONTEXTMENU";
  objectType: "node" | "comment" | "canvas" | "region";
  id?: string;
  selectedObjectIds: string[];
}

export interface IKeyboardConfig {
  actions: {
    delete: boolean;
    undo: boolean;
    redo: boolean;
    selectAll: boolean;
    cutToClipboard: boolean;
    copyToClipboard: boolean;
    pasteFromClipboard: boolean;
  };
}
export interface ICtxMenuHandler {
  type: "node" | "port" | "link" | "canvas" | "comment";
  targetObject?: UObj;
  selectedObjectIds: string[];
  mousePos: T2dPos;
}

export interface ENodeOutput {
  id: string;
  label: string;
}

/**
 * Elyra generic node
 */
export interface ENode {
  outputs: ENodeOutput[];
}

export type TGeneratorAction =
  | "create_node"
  | "create_comment"
  | "create_node_link"
  | "create_comment_link"
  | "clone_node"
  | "clone_comment"
  | "clone_node_link"
  | "clone_comment_link";

export interface IGeneratorActionCreateNode {
  label: string;
  description: string;
  operator_id_ref: string;
  type: "model_node";
  image: string;
  input_ports: {
    id: "inPort" | "outPort";
    label: "Input Port";
    cardinality: {
      min: number;
      max: number;
    };
  }[];
  output_ports: [];
}

export type TGeneratorData = IGeneratorActionCreateNode | null;
export type TNotificationMsgType = "info" | "success" | "warning" | "error";
interface INotificationMsg {
  id: string;
  type: TNotificationMsgType;
  callback(): void;
  title?: string;
  content?: string | ReactNode;
  timestamp?: string;
  closeMessage?: string;
}

export interface IMoveObject {
  nodes: ENode[];
  offsetX: number;
  offsetY: number;
}

export interface INodeData {
  nodeTemplate: UObj;
  offsetX: number;
  offsetY: number;
}

export interface IStyleSpec {
  body: { default: string; hover: string };
  image: { default: string };
  label: { default: string };
  selection_outline: { default: string };
}

export interface IPipelineObj {
  style: IStyleSpec;
  pipelineId: string;
  objId: string;
}

export interface ICanvasController {
  /**
   * ## Pipeline Flow methods
   * https://github.com/elyra-ai/canvas/wiki/2.4-Canvas-Controller-API#pipeline-flow-methods
   */

  /**
   * Loads the pipelineFlow document provided into common-canvas and displays it.
   * The document must conform to the pipelineFlow schema as documented in the
   * elyra-ai pipeline-schemas repo. Documents conforming to older versions may be
   * provided but they will be upgraded to the most recent version.
   * @param pipelineId
   */
  setPipelineFlow(pipelineFlow: UObj): void;
  /**
   * @return the current pipelineFlow document in the latest version of the
   * pipelineFlow schema as documented in the elyra-ai pipeline-schemas repo.
   */
  getPipelineFlow(): UObj;
  /**
   * Clears the pipleine flow and displays an empty canvas.
   */
  clearPipelineFlow(): void;
  /**
   * Returns the current pipelineFlow document ID.
   */
  getPipelineFlowId(): void;
  /**
   * Returns the ID of the primary pipeline from the pipelineFlow.
   */
  getPrimaryPipelineId(): void;
  /**
   * Returns the external pipeline flow for the url passed in. The external
   * flow must have been loaded through some common canvas action for this
   * method to be able to return anything.
   * @param url
   */
  getExternalPipelineFlow(url: string): void;
  /**
   * Returns the internal format of all canvas data stored in memory by
   * common-canvas. Nodes, comments and links are returned in the internal
   * format.
   */
  getCanvasInfo(): void;
  /**
   * @param pipelineId
   * @return the IDs of the ancestor pipleline of the pipeline ID passed in.
   */
  getAncestorPipelineIds(pipelineId: string): void;
  /**
   * Removes all styles from nodes, comments and links. See the setObjectsStyle
   * and setLinkStyle methods for details on setting styles.
   * temporary - is a boolean that indicates whether temporary or permanent
   * styles should be removed.
   * @param temporary - boolean
   */
  removeAllStyles(temporary: boolean): void;
  /**
   * Specifies the new styles for objects that are not highlighted during
   * branch highlighting.
   * @param newStyle - is a style specification object. See wiki for details.
   */
  setSubdueStyle(newStyle: UObj): void;

  /**
   * ## Pipeline methods
   * https://github.com/elyra-ai/canvas/wiki/2.4-Canvas-Controller-API#pipeline-methods
   */

  /**
   * @param pipelineId
   * @return the pipeline object for the pipeline Id passed in.
   */
  getPipeline(pipelineId: string): UObj;
  /**
   * Returns the ID of the pipeline object which is currently on display
   * in the canvas. Typically, this is the primary pipeline but will be
   * different if the user has navigated into one or more supernodes; in
   * which case it will be the ID of the pipeline at the level in the
   * supernode hierarchy that is currently on display.
   */
  getCurrentPipelineId(): string;
  /**
   * Returns truty if the pipeline is external (that is it is part of an
   * external pipeline flow). Otherwise, return falsy to indicate the pipeline
   * is local.
   */
  isPipelineExternal(pipelineId: string): boolean;
  /**
   * Returns the flow validation messages for the pipeline ID passed in.
   * @param pipelineId
   */
  getFlowMessages(pipelineId: string): UObj;
  /**
   * @return a boolean to indicate whether there are any messages of
   * includeMsgsType in the pipeline identified by the pipeline ID passed in.
   * @param includeMsgsType - can be either "error" or "warning"
   */
  isFlowValid(includeMsgTypes: "error" | "warning"): boolean;
  /**
   * Rearranges the nodes in the canvas in the direction specified for the
   * pipeline ID passed in.
   * @param layoutDirection - can be "horizontal" or "vertical"
   */
  autoLayout(layoutDirection: "horizontal" | "vertical"): void;

  /**
   * ## Palette methods
   * https://github.com/elyra-ai/canvas/wiki/2.4-Canvas-Controller-API#palette-methods
   */

  /**
   * Loads the palette data as described in the palette schema in
   * elyra-ai pipeline-schemas repo. Any version can be loaded and it will be
   * upgraded to the latest version.
   * @param palette
   */
  setPipelineFlowPalette(palette: UObj): void;
  /**
   * Clears the palette data from common-canvas.
   */
  clearPaletteData(): void;
  /**
   * Sets the loading text of the category. If set to a non-empty string the
   * category will show an InlineLoading control in the palette category div
   * with this text as the label. If set to falsey the palette category
   * will display as normal.
   * @param categoryId
   * @param loadingText
   */
  setCategoryLoadingText(categoryId: string, loadingText: string): void;
  /**
   * Sets the empty text of the category. If set to a non-empty string and the
   * category does not have any nodes, the palette will show a warning icon with
   * this text as a message under the category title when the category is opened.
   * This message will not be displayed if the field is set to falsey or if
   * nodetypes are added to the category.
   * @param categoryId
   * @param emptyText
   */
  setCategoryEmptyText(categoryId: string, emptyText: string): void;
  /**
   * Adds a new node into the palette:
   * @param nodeTypeObj - must conform to the style of node used by the palette as
   * described in the palette schema. See objects in nodeTypes array in the
   * palette schema:
   *  https://github.com/elyra-ai/pipeline-schemas/blob/master/common-canvas/palette/palette-v3-schema.json
   * @param category - is the name of the palette category where the node will be
   * added. If the category doesn't exist it will be created.
   * @param categoryLabel - Is an optional param. If a new category is created it will
   * be displayed with this label.
   * @param categoryDescription - Is an optional param. If a new category is created
   * it will be displayed with this description.
   * @param categoryImage - Is an optional param. The image displayed for the category provided as a
   * reference to an image or the image itself.
   * @param categoryId
   */
  addNodeTypeToPalette(
    nodeTypeObj: UObj,
    categoryId: string,
    categoryLabel: string,
    categoryDescription?: string,
    categoryImage?: string
  ): void;
  /**
   * Removes nodetypes from a palette category
   * @param selObjectIds - an array of object IDs to identify the nodetypes to be
   * @param categoryId - the ID of teh category from which the nodes will be removed
   */
  removeNodesFromPalette(selObjectIds: string[], categoryId: string): void;
  /**
   * @return the palette data document which will conform to the latest version
   * of the palette schema.
   */
  getPaletteData(): UObj;
  /**
   * @param operatorId
   * @return the palette node identified by the operator ID passed in.
   */
  getPaletteNode(operatorId: string): UObj;
  /**
   * @param nodeId
   * @return the palette node identified by the node ID passed in.
   */
  getPaletteNodeById(nodeId: string): UObj;
  /**
   * @param nodeOpIdRef
   * @return the category of the palette node identified by the operator passed in
   */
  getCategoryForNode(nodeOpIdRef: string): string;
  /**
   * Converts a node template from the format use in the palette (that conforms
   * to the schema) to the internal node format.
   * @param nodeTemplate
   */
  convertNodeTemplate(nodeTemplate: UObj): void;

  /**
   * ## Selection methods
   * https://github.com/elyra-ai/canvas/wiki/2.4-Canvas-Controller-API#selections-methods
   */

  /**
   * Sets the currently selected objects replacing any current selections.
   * Selected objects can only be in one pipeline. If this parameter is omitted
   * it is assumed the selections will be for objects in the 'top-level' pipeline
   * being displayed.
   * @param newSelection - An array of object IDs for nodes and/or comments
   * @param pipelineId - Optional. The ID of the pipeline where the objects exist.
   */
  setSelections(newSelection: UObj[], pipelineId?: string): void;
  /**
   * Clears all the current selections from the canvas.
   */
  clearSelections(): void;
  /**
   * Selects all the objects on the canvas.
   */
  selectAll(): void;
  /**
   * @return an array of the IDs of the currently selected objects.
   */
  getSelectedObjectIds(): string[];
  /**
   * @return the currently selected nodes.
   */
  getSelectedNodes(): ENode[];
  /**
   * @return the currently selected comments.
   */
  getSelectedComments(): UObj[];
  /**
   * @return the ID of the pipeline in which the currently selected objects
   * exist. Only one pipeline may contain selected objects.
   */
  getSelectedPipelineId(): string;
  /**
   * Deletes all currently selected objects.
   */
  deleteSelectedObjects(): void;
  /**
   * @return true if the currently selected objects are all linked together.
   * This is used when deciding to creating a supernode.
   */
  areSelectedNodesContiguous(): boolean;

  /**
   * ## Notification messages methods
   * https://github.com/elyra-ai/canvas/wiki/2.4-Canvas-Controller-API#notification-messages-methods
   */

  /**
   * Overwrites the array of notification messages shown in the notification panel.
   * @param newMessages - An array of messages (see `getNotificationMessages`)
   */
  setNotificationMessages(newMessages: UObj[]): void;
  /**
   * Deletes all notification messages shown in the notification panel.
   */
  clearNotificationMessages(): void;
  /**
   * Removes the notification messages from array of IDs.
   * @param ids - array of IDs
   */
  deleteNotificationMessages(ids: string[]): void;

  /**
   * Returns the array of current notification messages. If the messageType is
   * provided only messages of that type will be returned. If messageType is
   * not provided, all messages will be returned.
   * @param messageType - One of `"info" | "success" | "warning" | "error";`
   * @return `INotificationMsg`
   */
  getNotificationMessages(messageType?: TNotificationMsgType): INotificationMsg;
  /**
   *
   * Returns the maximum notification message type present in the current set
   * of notification messages. For this: ("error" > "warning" > "success" > "info")
   * @return `"info" | "success" | "warning" | "error";`
   */
  getNotificationMessagesMaxType(): TNotificationMsgType;

  /**
   * ## Node and Comment methods
   * https://github.com/elyra-ai/canvas/wiki/2.4-Canvas-Controller-API#node-and-comment-methods
   */

  /**
   * Moves the objects identified in the data object which must be in the
   * pipeline identified by the pipeline ID.
   * @param data
   * @param pipelineId
   */
  moveObjects(data: IMoveObject, pipelineId: string): void;

  /**
   * Deletes the objects specified in objectIds array.
   * @param objectIds - An array of node and comment IDs
   * @param pipelineId
   */
  deleteObjects(objectIds: UObj[], pipelineId: string): void;

  /**
   * Removes the links to and from the objects specified in the objectIds array.
   * @param objectIds - An array of node and comment IDs
   * @param pipelineId
   */
  disconnectObjects(objectIds: UObj[], pipelineId: string): void;
  /**
   * Deletes the object specified by the id in the pipeline specified by
   * pipeline ID.
   * @param id
   * @param pipelineId
   * @Deprecated Use deleteNode or deleteComment as appropriate instead.
   */
  deleteObject(id: string, pipelineId: string): void;

  /**
   * Sets the style of the objects specified by pipelineObjectIds to be
   * the newStyle which will be either temporary or permanent.
   * pipelineObjectIds: This identified the objects to be styles. It is a
   * javascript object like this:
   *
   * ```javascript
   *   {
   *     <pipelineID_1>: [
   *       <objectID_1_1>,
   *       <objectID_1_2>
   *     ],
   *     <pipelineID_2>: [
   *         <objectID_2_1>,
   *         <objectID_2_2>
   *     ]
   *   }
   * ```
   *
   * @param pipelineObjectIds
   * @param newStyle - This is a style specification. See the wiki for details.
   * @param temporary - A boolean to indicate if the style is serialized when
   *             getPipelineFlow() method is called or not.
   */
  setObjectsStyle(
    pipelineObjectIds: Record<string, string[]>,
    newStyle: IStyleSpec,
    temporary: boolean
  ): void;
  /**
   * Sets the styles of multiple objects at once.
   * @param pipelineObjStyles - Specified the objects and the styles each should be
   * set to. It is a javascript array like this:
   *
   * ```javascript
   *   [
   *     { pipelineId: <pipelineId>, objId: <objectId>, style: <style_spec>},
   *     { pipelineId: <pipelineId>, objId: <objectId>, style: <style_spec>},
   *     { pipelineId: <pipelineId>, objId: <objectId>, style: <style_spec>}
   *   ]
   * ```
   * @param temporary - A boolean to indicate if the styles are serialized when
   * getPipelineFlow() method is called or not.
   */
  setObjectsMultiStyle(
    pipelineObjStyles: IPipelineObj[],
    temporary: boolean
  ): void;

  /**
   * ## Node methods
   * https://github.com/elyra-ai/canvas/wiki/2.4-Canvas-Controller-API#node-methods
   */

  /**
   * Returns an array of nodes for the pipeline specified by the pipelineId.
   * @param pipelineId
   */
  getNodes(pipelineId: string): ENode[];
  /**
   * Returns a new node created from the data parameter in the pipeline
   * identified by the pipelineId.
   * @param data - An object containing
   *
   * `nodeTemplate` - a node template from the palette. The nodeTemplate
   *                 can be retrieved from the palette using with Canvas
   *                 Controller methods: getPaletteNode or getPaletteNodeById.
   *
   * `offsetX` - the x coordinate of the new node
   *
   * `offsetY` - the y coordinate of the new node
   *
   * @param pipelineId
   */
  createNode(data: INodeData, pipelineId: string): void;
  /**
   * Adds a new node into the pipeline specified by the pipelineId.
   * @param node
   * @param pipelineId
   */
  addNode(node: ENode, pipelineId: string): void;
  /**
   * Creates a node using the data parameter provided in the pipeline specified
   * by pipelineId and adds the command to the command stack (so the user can
   * undo/redo the command). This will also cause the beforeEditActionHandler
   * and editActionHandler callbacks to be called.
   * If pipelineId is omitted the node will be created in the current
   * "top-level" pipeline.
   * @param data - An object containing
   *
   * `nodeTemplate` - a node template from the palette. The nodeTemplate
   *                 can be retrieved from the palette using with Canvas
   *                 Controller methods: getPaletteNode or getPaletteNodeById.
   *
   * `offsetX` - the x coordinate of the new node
   *
   * `offsetY` - the y coordinate of the new node
   *
   * @param pipelineId
   */
  createNodeCommand(data: INodeData, pipelineId: string): void;
  /**
   * Deletes the node specified.
   * @param nodeId - The ID of the node
   * @param pipelineId - The ID of the pipeline
   */
  deleteNode(nodeId: string, pipelineId: string): void;
  /**
   * Sets the node properties
   * @param nodeId - The ID of the node
   * @param properties - An object containing properties to be overriden in the node
   * @param pipelineId - The ID of the pipeline
   */
  setNodeProperties(
    nodeId: string,
    properties: INodeData,
    pipelineId: string
  ): void;
  /**
   * Sets the node parameters
   * @param nodeId - The ID of the node
   * @param parameters - An array of parameters
   * @param pipelineId - The ID of the pipeline
   */
  setNodeParameters(
    nodeId: string,
    parameters: UObj[],
    pipelineId: string
  ): void;
  /**
   * Sets the node UI parameters
   * @param nodeId - The ID of the node
   * @param parameters - An array of UI parameters
   * @param pipelineId - The ID of the pipeline
   */
  setNodeUiParameters(
    nodeId: string,
    uiParameters: UObj[],
    pipelineId: string
  ): void;
  /**
   * Sets the node messages
   * @param nodeId - The ID of the node
   * @param messages - An array of messages
   * @param pipelineId - The ID of the pipeline
   */
  setNodeMessages(nodeId: string, messages: UObj[], pipelineId: string): void;
  /**
   * Sets a single message on a node
   * @param nodeId - The ID of the node
   * @param message - A message
   * @param pipelineId - The ID of the pipeline
   */
  setNodeMessage(nodeId: string, message: string, pipelineId: string): void;
  /**
   * Sets the lable for a node
   * @param nodeId - The ID of the node
   * @param ndeLabel - The label
   * @param pipelineId - The ID of the pipeline
   */
  setNodeLabel(nodeId: string, newLabel: string, pipelineId: string): void;
  /**
   * Sets the class name to newClassName of the nodes identified by nodeIds
   * array in the pipleine specified by pipeline ID. The class name will be
   * applied to the node body path.
   */
  setNodesClassName(
    nodeIds: string[],
    newClassName: string,
    pipelineId: string
  ): void;
  /**
   * Sets the decorations on a node. The decorations array passed in
   * will replace any decorations currently applied to the node.
   * @param nodeId - The ID of the node
   * @param newDecorations - An array of decorations. See Wiki for details.
   * @param pipelineId - The ID of the pipeline
   */
  setNodeDecorations(
    nodeId: string,
    newDecorations: UObj[],
    pipelineId: string
  ): void;
  /**
   * Sets the input ports on a node. The inputs array of ports provided will
   * replace any input ports for a node.
   * @param nodeId - The ID of the node
   * @param inputs - An array of input port objects.
   * @param pipelineId - The ID of the pipeline
   */
  setNodeInputPorts(nodeId: string, inputs: UObj[], pipelineId: string): void;
  /**
   * Sets the output ports on a node. The outputs array of ports provided will
   * replace any output ports for a node.
   * @param nodeId - The ID of the node
   * @param outputs - An array of output port objects.
   * @param pipelineId - The ID of the pipeline
   */
  setNodeOutputPorts(nodeId: string, outputs: UObj[], pipelineId: string): void;
  /**
   * Sets the decorations of multiple nodes at once. The decorations array
   * passed in will replace any decorations currently applied to the nodes.
   * pipelineNodeDecorations - Specifies the nodes and their decorations.
   * It is a JavaScript array like this:
   *
   * ```javascript
   *   [
   *     { pipelineId: <pipelineId>, nodeId: <nodeId>, decorations: <decoration_spec_array>},
   *     { pipelineId: <pipelineId>, nodeId: <nodeId>, decorations: <decoration_spec_array>},
   *     { pipelineId: <pipelineId>, nodeId: <nodeId>, decorations: <decoration_spec_array>}
   *   ]
   * ```
   */
  setNodesMultiDecorations(pipelineNodeDecorations: UObj[]): void;
  /**
   * Sets the input port label on a node
   * @param nodeId - The ID of the node
   * @param portId - The ID of the input port
   * @param newLabel - The label
   * @param pipelineId - The ID of the pipeline
   */
  setInputPortLabel(
    nodeId: string,
    portId: string,
    newLabel: string,
    pipelineId: string
  ): void;
  /**
   * Sets the output port label on a node
   * @param nodeId - The ID of the node
   * @param portId - The ID of the output port
   * @param newLabel - The label
   * @param pipelineId - The ID of the pipeline
   */
  setOutputPortLabel(
    nodeId: string,
    portId: string,
    newLabel: string,
    pipelineId: string
  ): void;
  /**
   * Gets a node
   * @param nodeId - The ID of the node
   * @param pipelineId - The ID of the pipeline
   */
  getNode(nodeId: string, pipelineId: string): void;
  /**
   * Gets the UI parameters for a node
   * @param nodeId - The ID of the node
   * @param pipelineId - The ID of the pipeline
   */
  getNodeUiParameters(nodeId: string, pipelineId: string): void;
  /**
   * Gets the supernodes for a pipeline.
   * @param pipelineId - The ID of the pipeline
   */
  getSupernodes(pipelineId: string): void;
  /**
   * @return supernode ID that has a subflow_ref to the given pipelineId.
   */
  getSupernodeObjReferencing(pipelineId: string): void;
  /**
   * Gets the messages for a node
   * @param nodeId - The ID of the node
   * @param pipelineId - The ID of the pipeline
   */
  getNodeMessages(nodeId: string, pipelineId: string): void;
  /**
   * Gets the array of input ports for the node or null if the node ID is
   * not recognized.
   * @param nodeId - The ID of the node
   * @param pipelineId - The ID of the pipeline
   */
  getNodeInputPorts(nodeId: string, pipelineId: string): void;
  /**
   * Gets the array of output ports for the node or null if the node ID is
   * not recognized.
   * @param nodeId - The ID of the node
   * @param pipelineId - The ID of the pipeline
   */
  getNodeOutputPorts(nodeId: string, pipelineId: string): void;
  /**
   * Gets a message for a specific control for a node
   * @param nodeId - The ID of the node
   * @param controlName - The control name
   * @param pipelineId - The ID of the pipeline
   */
  getNodeMessage(nodeId: string, controlName: string, pipelineId: string): void;
  /**
   * Gets an array of decorations for a node
   * @param nodeId - The ID of the node
   * @param pipelineId - The ID of the pipeline
   */
  getNodeDecorations(nodeId: string, pipelineId: string): void;
  /**
   * Gets the class name associated with the node specified by nodeId in the
   * pipeline specified by pipelineId.
   */
  getNodeClassName(nodeId: string, pipelineId: string): void;
  /**
   * Gets the style spcification (see Wiki) for a node
   * @param nodeId - The ID of the node
   * @param temporary - A boolean to indicate if the style is serialized when
   *             getPipelineFlow() method is called or not.
   * @param pipelineId - The ID of the pipeline
   */
  getNodeStyle(
    nodeId: string,
    temporary: boolean,
    pipelineId: string
  ): IStyleSpec;
  /**
   * Returns an array of nodes that are for the branch(es) that the nodes,
   * identified by the node IDs passed in, are within.
   * @param nodeIds - An array of node Ids
   * @param pipelineId - The ID of the pipeline where the nodes exist
   */
  getBranchNodes(nodeId: string[], pipelineId: string): void;
  /**
   * Returns an array of nodes that are upstream from the nodes
   * identified by the node IDs passed in.
   * @param nodeIds - An array of node Ids
   * @param pipelineId - The ID of the pipeline where the nodes exist
   */
  getUpstreamNodes(nodeId: string[], pipelineId: string): void;
  /**
   * Returns an array of nodes that are downstream from the nodes
   * identified by the node IDs passed in.
   * @param nodeIds - An array of node Ids
   * @param pipelineId - The ID of the pipeline where the nodes exist
   */
  getDownstreamNodes(nodeId: string[], pipelineId: string): void;
  /**
   * Returns a boolean to indicate whether the supernode is expanded in place.
   * @param nodeId - The ID of the node
   * @param pipelineId - The ID of the pipeline
   */
  isSuperNodeExpandedInPlace(nodeId: string, pipelineId: string): void;

  /**
   * ## Comment methods
   * https://github.com/elyra-ai/canvas/wiki/2.4-Canvas-Controller-API#comment-methods
   */

  /**
   * Returns the comments from the pipeline.
   * @param pipelineId - The ID of the pipeline
   */
  getComments(pipelineId: string): void;
  /**
   * Returns a comment from the pipeline.
   * @param comId - The ID of the comment
   * @param pipelineId - The ID of the pipeline
   */
  getComment(comId: string, pipelineId: string): void;
  /**
   * Creates a comment for the pipeline.
   * @param source - Input data
   * @param pipelineId - The ID of the pipeline
   */
  createComment(source: UObj, pipelineId: string): void;
  /**
   * Adds a comment to the pipeline.
   * @param data - the data describing the comment
   * @param pipelineId - The ID of the pipeline
   */
  addComment(data: UObj, pipelineId: string): void;
  /**
   * Edits a comment with the data.
   * @param data - the comment
   * @param pipelineId - The ID of the pipeline
   */
  editComment(data: UObj, pipelineId: string): void;
  /**
   * Sets the properties in the comment identified by the commentId. The
   * commentProperties is an object containing one or more properties that will
   * replace the corresponding properties in the comment. For example: if
   * commentProperties is { x_pos: 50, y_pos: 70 } the comment
   * will be set to that position.
   */
  setCommentProperties(
    commentId: string,
    commentProperties: { x_pos: number; y_pos: number },
    pipelineId: string
  ): void;
  /**
   * Sets the class name to newClassName of the comments identified by commentIds
   * array in the pipleine specified by pipeline ID. The class name will be
   * applied to the comment body path.
   */
  setCommentsClassName(
    commentIds: string[],
    newClassName: string,
    pipelineId: string
  ): void;
  /**
   * Deletes a comment
   * @param comId - The ID of the comment
   * @param pipelineId - The ID of the pipeline
   */
  deleteComment(comId: string, pipelineId: string): void;
  /**
   * Gets the class name associated with the comment specified by commentId in the
   * pipeline specified by pipelineId.
   */
  getCommentClassName(commentId: string, pipelineId: string): void;
  /**
   * Gets the style spcification (see Wiki) for a comment
   * @param commentId - The ID of the node
   * @param temporary - A boolean to indicate if the style is serialized when
   *             getPipelineFlow() method is called or not.
   * @param pipelineId - The ID of the pipeline
   */
  getCommentStyle(
    commentId: string,
    temporary: boolean,
    pipelineId: string
  ): IStyleSpec;
  /**
   * Gets a link
   * @param linkId - The ID of the link
   * @param pipelineId - The ID of the pipeline
   */
  getLink(linkId: string, pipelineId: string): UObj;

  /**
   * @return an array of link objects for the pipelineId passed in.
   * @param pipelineId - The ID of the pipeline
   */
  getLinks(pipelineId: string): UObj[];
  /**
   * Sets the properties in the link identified by the linkId. The
   * linkProperties is an object containing one or more properties that will
   * replace the corresponding properties in the link. For exam`ple: if
   * linkProperties is { trgNodeId: "123", trgNodePortId: "789" } the target
   * node ID will be set to "123" and the target port ID set to "789".
   */
  setLinkProperties(
    linkId: string,
    linkProperties: { trgNodeId: string; trgNodePortId: string },
    pipelineId: string
  ): void;
  /**
   * Sets the source properties in the data link identified by the linkId. The
   * srcNodeId and srcNodePortId will be set to the values provided. If
   * srcNodePortId is set to null the current srcNodePortId will be removed
   * from the link. Also, if the link has a srcPos property (because its
   * source end is detached) that will be removed.
   */
  setNodeDataLinkSrcInfo(
    linkId: string,
    srcNodeId: string,
    srcNodePortId: string,
    pipelineId: string
  ): void;
  /**
   * Sets the target properties in the data link identified by the linkId. The
   * trgNodeId and trgNodePortId will be set to the values provided. If
   * trgNodePortId is set to null the current trgNodePortId will be removed
   * from the link. Also, if the link has a trgPos property (because its
   * target end is detached) that will be removed.
   */
  setNodeDataLinkTrgInfo(
    linkId: string,
    trgNodeId: string,
    trgNodePortId: string,
    pipelineId: string
  ): void;
  /**
   * Gets a node to node data link
   * @param srcNodeId - The ID of the source node
   * @param srcNodePortId - The ID of the source node port
   * @param trgNodeId - The ID of the target node
   * @param trgNodePortId - The ID of the target node port
   * @param pipelineId - The ID of the pipeline
   */
  getNodeDataLinkFromInfo(
    srcNodeId: string,
    srcNodePortId: string,
    trgNodeId: string,
    trgNodePortId: string,
    pipelineId: string
  ): ENode;
  /**
   * Gets a comment to node link
   * @param id1 - The ID of the comment
   * @param id2 - The ID of the node
   * @param pipelineId - The ID of the pipeline
   */
  getCommentLinkFromInfo(id1: string, id2: string, pipelineId: string): UObj;
  /**
   * Gets a node to node association link
   * @param id1 - The ID of one of the node
   * @param id2 - The ID of one of the node
   * @param pipelineId - The ID of the pipeline
   */
  getNodeAssocLinkFromInfo(id1: string, id2: string, pipelineId: string): void;
  /**
   * Adds links to a pipeline
   * @param linkList - An array of links
   * @param pipelineId - The ID of the pipeline
   */
  addLinks(linkList: UObj[], pipelineId: string): void;
  /**
   * Deletes a link
   * @param source - An array of links
   * @param pipelineId - The ID of the pipeline
   */
  deleteLink(link: UObj, pipelineId: string): void;

  /**
   * Creates node to node links
   * @param data - Data describing the links
   * @param pipelineId - The ID of the pipeline
   */
  createNodeLinks(data: UObj[], pipelineId: string): void;

  /**
   * Creates comment links
   * @param data - Data describing the links
   * @param pipelineId - The ID of the pipeline
   */
  createCommentLinks(data: UObj, pipelineId: string): void;
  /**
   * Sets the class name to newClassName of the links identified by linkIds
   * array in the pipleine specified by pipeline ID. The class name will be
   * applied to the link line path.
   */
  setLinksClassName(
    linkIds: string[],
    newClassName: string,
    pipelineId: string
  ): void;
  /**
   * Sets the style of the links specified by pipelineLinkIds to be
   * the newStyle which will be either temporary or permanent.
   * pipelineLinkIds - This identifies the objects to be styles. It is a
   * javascript object like this:
   *   {
   *     <pipelineID_1>: [
   *       <linkID_1_1>,
   *       <linkID_1_2>
   *     ],
   *     <pipelineID_2>: [
   *         <linkID_2_1>,
   *         <linkID_2_2>
   *     ]
   *   }
   * @param newStyle - This is a style specification. See the wiki for details.
   * @param temporary - A boolean to indicate if the style is serialized when
   *             getPipelineFlow() method is called or not.
   */
  setLinksStyle(
    pipelineLinkIds: Record<string, string[]>,
    newStyle: IStyleSpec,
    temporary: boolean
  ): void;
  /**
   * Sets the styles of multiple links at once.
   * pipelineObjStyles - Specified the links and the styles each should be
   * set to. It is a javascript array like this:
   *   [
   *     { pipelineId: <pipelineId>, objId: <linkId>, style: <style_spec>},
   *     { pipelineId: <pipelineId>, objId: <linkId>, style: <style_spec>},
   *     { pipelineId: <pipelineId>, objId: <linkId>, style: <style_spec>}
   *   ]
   * @param temporary - A boolean to indicate if the styles are serialized when
   *             getPipelineFlow() method is called or not.
   */
  setLinksMultiStyle(
    pipelineObjStyles: IPipelineObj[],
    temporary: boolean
  ): void;
  /**
   * Gets the class name associated with the link specified by linkId in the
   * pipeline specified by pipelineId.
   */
  getLinkClassName(linkId: string, pipelineId: string): void;
  /**
   * Returns the style specification for a link.
   * @param linkIds - An array of links
   * @param temporary - A boolean to indicate if the style is serialized when
   *             getPipelineFlow() method is called or not.
   * @param pipelineId - The ID of the pipeline
   * @return the style specification for a link.
   */
  getLinkStyle(
    linkId: string,
    temporary: boolean,
    pipelineId: string
  ): IStyleSpec;
  /**
   * Sets the decorations on a link. The decorations array passed in
   * will replace any decorations currently applied to the link.
   * @param linkId - The ID of the link
   * @param newDecorations - An array of decorations. See Wiki for details.
   * @param pipelineId - The ID of the pipeline
   */
  setLinkDecorations(
    linkId: string,
    newDecorations: UObj[],
    pipelineId: string
  ): void;
  /**
   * Sets the decorations of multiple links at once. The decorations array
   * passed in will replace any decorations currently applied to the links.
   * @param pipelineLinkDecorations - Specifies the links and their decorations.
   *
   * ```javascript
   * It is a javascript array like this:
   *   [
   *     { pipelineId: <pipelineId>, linkId: <linkId>, decorations: <decoration_spec_array>},
   *     { pipelineId: <pipelineId>, linkId: <linkId>, decorations: <decoration_spec_array>},
   *     { pipelineId: <pipelineId>, linkId: <linkId>, decorations: <decoration_spec_array>}
   *   ]
   * ```
   */
  setLinksMultiDecorations(pipelineLinkDecorations: IPipelineObj[]): void;
  /**
   * Gets an array of decorations for a link
   * @param linkId - The ID of the link
   * @param pipelineId - The ID of the pipeline
   */
  getLinkDecorations(linkId: string, pipelineId: string): void;
  /**
   * Returns the current array of breadcrumbs. There will one breadcrumb object
   * for each level of supernode that the user has navigated into. This array
   * can be used to display breadcrumbs to the user to show where they are
   * within the navigation hierarchy within common canvas.
   */
  getBreadcrumbs(): void;
  /**
   * @return the last breadcrumb which represents the level with supernode
   * hierarchy that the user has currently navigated to.
   */
  getCurrentBreadcrumb(): void;

  /**
   * ## Branch highlight methods
   * https://github.com/elyra-ai/canvas/wiki/2.4-Canvas-Controller-API#branch-highlight-methods
   */

  /**
   * Highlights the branch(s) (both upstream and downstream) from the node
   * IDs passed in and returns the highlighted object Ids.
   * @param nodeIds - An array of node Ids
   * @param pipelineId - The ID of the pipeline
   */
  highlightBranch(nodeIds: string[], pipelineId: string): string[];
  /**
   * Highlights the upstream nodes from the node IDs passed in
   * and returns the highlighted object Ids.
   */
  highlightUpstream(nodeIds: string[], pipelineId: string): string[];
  /**
   * Highlights the downstream nodes from the node IDs passed in
   * and returns highlighted object Ids.
   * @param nodeIds - An array of node Ids
   * @param pipelineId - The ID of the pipeline
   */
  highlightDownstream(nodeIds: string[], pipelineId: string): string[];

  /**
   * ## Logging methods
   * https://github.com/elyra-ai/canvas/wiki/2.4-Canvas-Controller-API#logging-methods
   */

  /**
   * @return a Boolean to indicate whether canvas logging is switched on or off.
   */
  getLoggingState(): boolean;
  /**
   * Sets canvas logging based on the Boolean passed in.
   * @param state
   */
  setLoggingState(state: boolean): void;
  openPalette(): void;
  closePalette(): void;
  isPaletteOpen(): boolean;

  /**
   * ## Context menu methods
   * https://github.com/elyra-ai/canvas/wiki/2.4-Canvas-Controller-API#context-menu-methods
   */

  /**
   * Opens the context menu
   * @param menuDef
   */
  openContextMenu(menuDef: UObj): void;
  /**
   * Closes the context menu
   */
  closeContextMenu(): void;

  /**
   * ## Notification panel methods
   * https://github.com/elyra-ai/canvas/wiki/2.4-Canvas-Controller-API#notification-panel-methods
   */

  /**
   * Opens the notification panel
   */
  openNotificationPanel(): void;
  /**
   * Closes the notification panel
   */
  closeNotificationPanel(): void;
  /**
   * Either opens or closes the notifictaion panel based on its current status
   */
  toggleNotificationPanel(): void;
  /**
   * @return a boolean to indicate if the right flyout is open or not
   */
  isRightFlyoutOpen(): boolean;
  /**
   * @return a boolean to indicate if the bottom panel is open or not
   */

  /**
   * ## Bottom panel methods
   * https://github.com/elyra-ai/canvas/wiki/2.4-Canvas-Controller-API#bottom-panel-methods
   */

  isBottomPanelOpen(): boolean;
  /**
   * Sets the height of the bottom panel in pixels. This can be called
   * immediately after the CanvasController has been created, if the bottom
   * panel should be displayed at a specific height when it first opens.
   * @param height - height in pixels
   */
  setBottomPanelHeight(height: number): void;

  /**
   * ## Canvas/pipeline navigation methods
   * https://github.com/elyra-ai/canvas/wiki/2.4-Canvas-Controller-API#canvaspipeline-navigation-methods
   */

  /**
   * Displays a pipeline (identified by the pipelineId passed in). This must be
   * one of the pipelines referenced by the current set of breadcrumbs. It
   * cannot be used to open a new pipeline outside the current set of breadcruumbs.
   * @param pipelineId
   */
  displaySubPipeline(pipelineId: string): void;
  /**
   * Displays a pipeline for the supernode (identified by the supernodeId
   * parameter) in the pipeline (identified by the pipelineId parameter). For
   * correct breadcrumb generation this pipeline should be the one in the last
   * of the current set of breadcrumbs. That is, the pipeline currently shown
   * "full page" in the canvas.
   */
  displaySubPipelineForSupernode(supernodeId: string, pipelineId: string): void;
  /**
   * Displays full-page the previous pipeline from the one currently being displayed
   */
  displayPreviousPipeline(): void;

  /**
   * ## Zoom methods
   * https://github.com/elyra-ai/canvas/wiki/2.4-Canvas-Controller-API#zoom-methods
   */

  /**
   * Centers the canvas contents and zooms in
   */
  zoomIn(): void;
  /**
   * Centers the canvas contents and zooms out
   */
  zoomOut(): void;
  /**
   * Zooms the canvas contents to fit within the viewport
   */
  zoomToFit(): void;

  /**
   * Changes the zoom amounts for the canvas. This method does not alter the
   * pipelineFlow document. zoomObject is an object with three fields:
   * @param zoomObject - accepts a config object where
   *
   * `x`: Is the horizontal translate amount which is a number indicating the
   *    pixel amount to move. Negative left and positive right
   *
   * `y`: Is the vertical translate amount which is a number indicating the
   *    pixel amount to move. Negative up and positive down.
   *
   * `k`: is the scale amount which is a number greater than 0 where 1 is the
   *    default scale size.
   */
  zoomTo(zoomObject: { x: number; y: number; k: number }): void;
  /**
   * Increments the translation of the canvas by the x and y increment
   * amounts. The optional animateTime parameter can be provided to animate the
   * movement of the canvas. It is a time for the animation in milliseconds.
   * If omitted the movement happens immediately.
   */
  translateBy(x: number, y: number, animateTime: number): void;
  /**
   * @return the current zoom object for the currently displayed canvas or null
   * if the canvas is not yet rendered for the first time.
   */
  getZoom(): void | null;
  /**
   * Returns a zoom object required to pan the objects (nodes and/or comments)
   * identified by the objectIds array to 'reveal' the objects in the viewport.
   * The zoom object returned can be provided to the CanvasController.zoomTo()
   * method to perform the zoom/pan action.
   * If the xPos and yPos variables are provided it will return a zoom object
   * to pan the objects to a location specified by a percentage offset of the
   * viewport width and height respectively.
   * If the xPos and yPos parameters are undefined (omitted) and all the
   * objects are fully within the canvas viewport, it will return null.
   * This can be used to detect whether the objects are fully visible or not.
   * Otherwise it will return a zoom object which can be used to pan the
   * objects into the viewport so they appear at the nearest side of the
   * viewport to where they are currently positioned.
   * The zoom object has three fields:
   *
   * `x`: Is the horizontal translate amount which is a number indicating the
   *    pixel amount to move. Negative left and positive right
   *
   * `y`: Is the vertical translate amount which is a number indicating the
   *    pixel amount to move. Negative up and positive down.
   *
   * `k`: is the scale amount which is a number greater than 0 where 1 is the
   *    default scale size.
   *
   * Parameters:
   * @param objectIds - An array of nodes and/or comment IDs.
   * @param xPos - Optional. Can be set to percentage offset of the viewport width.
   * @param yPos - Optional. Can be set to percentage offset of the viewport height.
   */
  getZoomToReveal(objectIds: string[], xPos?: number, yPos?: number): void;
  /**
   * Clears any saved zoom values stored in local storage. This means
   * newly opened flows will appear with the default zoom. This method
   * is only applicable when the `enableSaveZoom` config parameter is
   * set to "LocalStorage".
   */
  clearSavedZoomValues(): void;
}

export interface ICommonCanvasProps {
  /**
   * https://github.com/elyra-ai/canvas/wiki/2.4-Canvas-Controller-API
   * Your application code can programmatically perform many of the actions that the user can do in the common canvas using the Canvas Controller API. Note: See this section for differences between the structure of objects in the API and the schema.
   * In most cases within the API, the pipelineId parameter is optional. If pipelineId is omitted, the method will default to the pipeline that is currently displayed in the main canvas viewport.
   * 
   * Warning 1: Do not alter the IDs of objects that currently exist on the canvas. Changing object IDs can cause internal problems, in particular with the command stack.
   * 
   * Warning 2: When using external pipline flows, Pipeline IDs must be globally unique identifiers.
   */
  canvasController: ICanvasController;
  /**
   * https://github.com/elyra-ai/canvas/wiki/2.1-Config-Objects#canvas-config-object
   */
  config?: ICanvasConfig;
  /**
   * https://github.com/elyra-ai/canvas/wiki/2.1-Config-Objects#toolbar-config-object
   */
  toolbarConfig?: IToolbarConfig;
  /**
   * https://github.com/elyra-ai/canvas/wiki/2.1-Config-Objects#notification-config-object
   */
  notificationConfig?: INotificationConfig;
  /**
   * https://github.com/elyra-ai/canvas/wiki/2.1-Config-Objects#context-menu-config-object
   */
  contextMenuConfig?: ICtxMenuConfig;
  /**
   * https://github.com/elyra-ai/canvas/wiki/2.1-Config-Objects#keyboard-config-object
   */
  keyboardConfig?: IKeyboardConfig;
  /**
   * https://github.com/elyra-ai/canvas/wiki/2.2-Common-Canvas-callbacks#contextmenuhandler
   */
  contextMenuHandler?: (
    source: ICtxMenuHandlerSource,
    defaultMenu: ICtxMenuHandlerDefaultMenuAction[]
  ) => ICtxMenuHandler;
  /**
   * https://github.com/elyra-ai/canvas/wiki/2.2-Common-Canvas-callbacks#beforeeditactionhandler
   */
  beforeEditActionHandler?: (
    data: IEditActionData,
    command: IEditActionCommand
  ) => IEditActionCommand | void;
  /**
   * https://github.com/elyra-ai/canvas/wiki/2.2-Common-Canvas-callbacks#beforeeditactionhandler
   */
  editActionHandler?: (
    data: IEditActionData,
    command: IEditActionCommand
  ) => void;
  /**
   * https://github.com/elyra-ai/canvas/wiki/2.2-Common-Canvas-callbacks#clickactionhandler
   */
  clickActionHandler?: (source: IClickActionSource) => void;
  /**
   * https://github.com/elyra-ai/canvas/wiki/2.2-Common-Canvas-callbacks#decorationactionhandler
   */
  decorationActionHandler?: (
    object: UObj,
    id: string,
    pipelineId: string
  ) => void;
  /**
   * https://github.com/elyra-ai/canvas/wiki/2.2-Common-Canvas-callbacks#layouthandler
   */
  layoutHandler?: (data: ENode) => void;
  /**
   * https://github.com/elyra-ai/canvas/wiki/2.2-Common-Canvas-callbacks#tiphandler
   */
  tipHandler?: (tipType: string, data: UObj) => string | ReactNode | null;
  /**
   * https://github.com/elyra-ai/canvas/wiki/2.2-Common-Canvas-callbacks#idgeneratorhandler
   */
  idGeneratorHandler?: (
    action: TGeneratorAction,
    data?: TGeneratorData
  ) => void;
  /**
   * https://github.com/elyra-ai/canvas/wiki/2.2-Common-Canvas-callbacks#selectionchangehandler
   */
  selectionChangeHandler?: (data: UObj) => void;
  /**
   * https://github.com/elyra-ai/canvas/wiki/2.2-Common-Canvas-callbacks#actionlabelhandler
   */
  actionLabelHandler?: (action: TGeneratorAction) => string | null | void;
  showRightFlyout?: boolean;
  rightFlyoutContent?: ReactNode;
  showBottomPanel?: boolean;
  bottomPanelContent?: ReactNode;
}

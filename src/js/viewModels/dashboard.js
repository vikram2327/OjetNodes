/**
 * @license
 * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['../accUtils','ojs/ojcore', 'knockout', 'jquery', 'ojs/ojarraydataprovider','diagramLayouts/treeLayout','ojs/ojdiagram'],
 function(accUtils,oj, ko, $,ArrayDataProvider, treeLayout) {
    function DashboardViewModel() {

      var self = this;

         // Assign the treeLayout function to Diagram
        self.layoutFunc = treeLayout;

        // Generate 3 colors that we will use for the Diagram nodes
        var colorHandler = new oj.ColorAttributeGroupHandler();
        var color1 = colorHandler.getValue("Group 1");
        var color2 = colorHandler.getValue("Group 2");
        var color3 = colorHandler.getValue("Group 3");

        // For this demo we will create a Diagram with 10 nodes and 3 color categories
        var diagramNodes = [
                {id: "N0", label: "N0", shortDesc: "Node N0, Group 1", icon: {color: color1}},
                {id: "N1", label: "N1", shortDesc: "Node N1, Group 1", icon: {color: color1}},
                {id: "N2", label: "N2", shortDesc: "Node N2, Group 2", icon: {color: color2}},
                {id: "N3", label: "N3", shortDesc: "Node N3, Group 3", icon: {color: color3}},
                {id: "N4", label: "N4", shortDesc: "Node N4, Group 1", icon: {color: color1}},
                {id: "N5", label: "N5", shortDesc: "Node N5, Group 2", icon: {color: color2}},
                {id: "N6", label: "N6", shortDesc: "Node N6, Group 3", icon: {color: color3}},
                {id: "N7", label: "N7", shortDesc: "Node N7, Group 1", icon: {color: color1}},
                {id: "N8", label: "N8", shortDesc: "Node N8, Group 2", icon: {color: color2}},
                {id: "N9", label: "N9", shortDesc: "Node N9, Group 3", icon: {color: color3}}
        ];

        // Create Diagram links
        var diagramLinks = [
                {id: "L0", shortDesc: "Link L0, connects N0 to N1", startNode: "N0", endNode: "N1"},
                {id: "L1", shortDesc: "Link L1, connects N0 to N2", startNode: "N0", endNode: "N2"},
                {id: "L2", shortDesc: "Link L2, connects N0 to N3", startNode: "N0", endNode: "N3"},
                {id: "L3", shortDesc: "Link L3, connects N1 to N4", startNode: "N1", endNode: "N4"},
                {id: "L4", shortDesc: "Link L4, connects N1 to N5", startNode: "N1", endNode: "N5"},
                {id: "L5", shortDesc: "Link L5, connects N3 to N6", startNode: "N3", endNode: "N6"},
                {id: "L6", shortDesc: "Link L6, connects N3 to N7", startNode: "N3", endNode: "N7"},
                {id: "L7", shortDesc: "Link L7, connects N3 to N8", startNode: "N3", endNode: "N8"},
                {id: "L8", shortDesc: "Link L8, connects N3 to N9", startNode: "N3", endNode: "N9"},

        ];

        self.nodes = ko.observableArray(diagramNodes);
        self.links = ko.observableArray(diagramLinks);

        self.nodeDataProvider = new ArrayDataProvider(self.nodes, {
            keyAttributes: "id",
        });

        self.linkDataProvider = new ArrayDataProvider(self.links, {
            keyAttributes: "id",
        });
        // Style the nodes and links
        this.styleDefaults = {
            nodeDefaults: {
                icon: {width: 50, height: 50, shape: "square"}},
            linkDefaults: {
                startConnectorType: "none",
                endConnectorType: "arrow"
            }
        };

        // ********************VK CODE***********************
        self.data2 = ko.pureComputed(function () {
          return new oj.JsonDiagramDataSource({
            'nodes': self.nodes2(),
            'links': self.links2()
          });
        });
        // ********************./VK CODE***********************
        // **************************************************************
        // *************************Tree Layout **************************
        // **************************************************************
      // function treeLayout(layoutContext) {

      //     // Get the node and link counts from the layout context
      //     var nodeCount = layoutContext.getNodeCount();
      //     var linkCount = layoutContext.getLinkCount();
  
      //     // Create a child-parent map based on the links
      //     var childParentMap = {};
      //     for (var i = 0; i < linkCount; i++) {
      //         var link = layoutContext.getLinkByIndex(i);
      //         var parentId = link.getStartId();
      //         var childId = link.getEndId();
  
      //         childParentMap[childId] = parentId;
      //     }
  
      //     // *************************************************************
      //     var parentChildMap = {};
      //     var maxNodeWidth = 0;
      //     var maxNodeHeight = 0;
  
      //     // Loop though the nodes to create a parent-child map
      //     // and to find the largest node width and height
      //     for (var i = 0; i < nodeCount; i++) {
      //         var node = layoutContext.getNodeByIndex(i);
  
      //         var nodeId = node.getId();
      //         var parentId = childParentMap[nodeId];
  
      //         // Keep track of the largest node width and height, for layout purposes
      //         var nodeBounds = node.getContentBounds();
      //         maxNodeWidth = Math.max(nodeBounds.w, maxNodeWidth);
      //         maxNodeHeight = Math.max(nodeBounds.h, maxNodeHeight);
  
      //         // Add this node id to the parent-child map for that parent
      //         // The root nodes (i.e. nodes with no parent) will appear under the key undefined in the parent-child map
      //         var children = parentChildMap[parentId];
      //         if (!children) {
      //             children = [];
      //             parentChildMap[parentId] = children;
      //         }
      //         children.push(nodeId);
      //     }
      // // *************************************************************
      //  // For horizontal layout, calculate the level width based on the widest node in this level
      //     // and calculate space for each node based on the tallest node
      //     var levelSize = maxNodeWidth * 1.5;
      //     var siblingSize = maxNodeHeight * 1.1;
  
      //     // Layout the nodes
      //     layoutSubTree(layoutContext, undefined, parentChildMap, childParentMap, levelSize, siblingSize, -1, [0]);
  
      //     // Layout the links
      //     for (var i = 0; i < linkCount; i++) {
      //         var link = layoutContext.getLinkByIndex(i);
      //         var parentNode = layoutContext.getNodeById(link.getStartId());
      //         var childNode = layoutContext.getNodeById(link.getEndId());
      //         var parentNodePos = parentNode.getPosition();
      //         var parentNodeBounds = parentNode.getContentBounds();
      //         var childNodePos = childNode.getPosition();
      //         var childNodeBounds = childNode.getContentBounds();
  
      //         // Draw horizontal link between center of parent right edge and center of child left edge
      //         var startX = parentNodePos.x + parentNodeBounds.x + parentNodeBounds.w + link.getStartConnectorOffset();
      //         var startY = parentNodePos.y + parentNodeBounds.y + parentNodeBounds.h * .5;
      //         var endX = childNodePos.x + childNodeBounds.x - link.getEndConnectorOffset();
      //         var endY = childNodePos.y + childNodeBounds.y + childNodeBounds.h * .5;
  
      //         // Set the start, end and the middle points on the link
      //         link.setPoints([startX, startY, (startX + endX) * 0.5, startY, (startX + endX) * 0.5, endY, endX, endY]);
      //     }
      // };
  
      // **************************************************************

      /**
     * Lays out the subtree with the specified root id
     *
     * @param {DvtDiagramLayoutContext} layoutContext the Diagram layout context
     * @param {string} rootId the id of the subtree root, may be null if this is the top-level entry call
     * @param {object} parentChildMap A map from parent id to an array of child ids
     * @param {object} childParentMap A map from child id to parent id
     * @param {number} levelSize The width (including spacing) allocated to each level of the tree
     * @param {number} siblingSize The height (including spacing) allocated to siblings in the same level
     * @param {number} currentDepth the depth of rootId within the tree
     * @param {array} leafPos A singleton array containing the current y position for leaf nodes that will be updated during layout
     *
     * @return {object} the position of the subtree root
     */
    // function layoutSubTree (layoutContext, rootId, parentChildMap, childParentMap, levelSize, siblingSize, currentDepth, leafPos) {

    //   var currentPos = leafPos[0];
    //   var childNodes = parentChildMap[rootId];

    //   // If this is a root node for other child nodes, then layout the child nodes
    //   if (childNodes) {

    //       currentPos = 0;
    //       for (var i = 0; i < childNodes.length; i++) {
    //           // Layout the child subtrees recursively
    //           var childPosition = layoutSubTree(layoutContext, childNodes[i], parentChildMap, childParentMap, levelSize, siblingSize, currentDepth + 1, leafPos);

    //           // Center parent node vertically next to the children
    //           currentPos += childPosition.y / childNodes.length;
    //       }
    //   } else {
    //       // Leaf node, advance the current leaf position
    //       leafPos[0] += siblingSize;
    //   }

    //   var position = {x: currentDepth * levelSize, y: currentPos};

    //   if (rootId) {
    //       var root = layoutContext.getNodeById(rootId);
    //       if (root) {
    //           var bounds = root.getContentBounds();
    //           var rootPos = {x: position.x - bounds.x - bounds.w * .5, y: position.y};
    //           root.setPosition(rootPos);

    //           // Center the label inside the node
    //           var nodeLabelBounds = root.getLabelBounds();
    //           if (nodeLabelBounds) {
    //               var labelX = bounds.x + rootPos.x + 0.5 * (bounds.w - nodeLabelBounds.w);
    //               var labelY = bounds.y + rootPos.y + 0.5 * (bounds.h - nodeLabelBounds.h);
    //               root.setLabelPosition({'x': labelX, 'y': labelY});
    //           }
    //       }
    //   }
      
    //   return position;
    // }



























      
      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * This method might be called multiple times - after the View is created
       * and inserted into the DOM and after the View is reconnected
       * after being disconnected.
       */
      this.connected = () => {
        accUtils.announce('Dashboard page loaded.');
        document.title = "Dashboard";
        // Implement further logic if needed
      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      this.disconnected = () => {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      this.transitionCompleted = () => {
        // Implement if needed
      };
    }

    /*
     * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
     * return a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.
     */
    return DashboardViewModel;
  }
);

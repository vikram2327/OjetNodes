define(["require", "exports", "diagramLayouts/DemoLayoutSupport"], function (require, exports, support) {
    "use strict";
   /**
     * Performs a simple horizontal tree layout.  Assumes that links are specified
     * to create a strict hierarchy (i.e. every node can have 0 or 1 incoming links
     * and arbitrarily many outgoing links)
     *
     * @param {DvtDiagramLayoutContext} layoutContext the Diagram layout context
     */
    function treeLayout(layoutContext) {

        // Get the node and link counts from the layout context
        var nodeCount = layoutContext.getNodeCount();
        var linkCount = layoutContext.getLinkCount();

        // Create a child-parent map based on the links
        var childParentMap = {};
        for (var i = 0; i < linkCount; i++) {
            var link = layoutContext.getLinkByIndex(i);
            var parentId = link.getStartId();
            var childId = link.getEndId();

            childParentMap[childId] = parentId;
        }

        // *************************************************************
        var parentChildMap = {};
        var maxNodeWidth = 0;
        var maxNodeHeight = 0;

        // Loop though the nodes to create a parent-child map
        // and to find the largest node width and height
        for (var i = 0; i < nodeCount; i++) {
            var node = layoutContext.getNodeByIndex(i);

            var nodeId = node.getId();
            var parentId = childParentMap[nodeId];

            // Keep track of the largest node width and height, for layout purposes
            var nodeBounds = node.getContentBounds();
            maxNodeWidth = Math.max(nodeBounds.w, maxNodeWidth);
            maxNodeHeight = Math.max(nodeBounds.h, maxNodeHeight);

            // Add this node id to the parent-child map for that parent
            // The root nodes (i.e. nodes with no parent) will appear under the key undefined in the parent-child map
            var children = parentChildMap[parentId];
            if (!children) {
                children = [];
                parentChildMap[parentId] = children;
            }
            children.push(nodeId);
        }
    // *************************************************************
     // For horizontal layout, calculate the level width based on the widest node in this level
        // and calculate space for each node based on the tallest node
        var levelSize = maxNodeWidth * 1.5;
        var siblingSize = maxNodeHeight * 1.1;

        // Layout the nodes
        layoutSubTree(layoutContext, undefined, parentChildMap, childParentMap, levelSize, siblingSize, -1, [0]);

        // Layout the links
        for (var i = 0; i < linkCount; i++) {
            var link = layoutContext.getLinkByIndex(i);
            var parentNode = layoutContext.getNodeById(link.getStartId());
            var childNode = layoutContext.getNodeById(link.getEndId());
            var parentNodePos = parentNode.getPosition();
            var parentNodeBounds = parentNode.getContentBounds();
            var childNodePos = childNode.getPosition();
            var childNodeBounds = childNode.getContentBounds();

            // Draw horizontal link between center of parent right edge and center of child left edge
            var startX = parentNodePos.x + parentNodeBounds.x + parentNodeBounds.w + link.getStartConnectorOffset();
            var startY = parentNodePos.y + parentNodeBounds.y + parentNodeBounds.h * .5;
            var endX = childNodePos.x + childNodeBounds.x - link.getEndConnectorOffset();
            var endY = childNodePos.y + childNodeBounds.y + childNodeBounds.h * .5;

            // Set the start, end and the middle points on the link
            link.setPoints([startX, startY, (startX + endX) * 0.5, startY, (startX + endX) * 0.5, endY, endX, endY]);
        }
    };

    // *************************************************************
    // *************************************************************
    // *************************************************************

    return treeLayout;
});
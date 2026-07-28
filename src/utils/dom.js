export function reconcileFeed(container, newItemsHtmlMap, orderedKeys) {
  const existingNodes = Array.from(container.children);
  const nodeMap = new Map();

  existingNodes.forEach(node => {
    if (node.hasAttribute('data-feed-id')) {
      nodeMap.set(node.getAttribute('data-feed-id'), node);
    }
  });

  // Remove nodes that are no longer in the map
  nodeMap.forEach((node, id) => {
    if (!newItemsHtmlMap.has(id)) {
      node.remove();
    }
  });

  let previousNode = null;
  const newTriggerId = 'load-more-trigger';

  orderedKeys.forEach((id) => {
    let node = nodeMap.get(id);
    const newHtml = newItemsHtmlMap.get(id);
    
    if (!node) {
      node = document.createElement('div');
      node.setAttribute('data-feed-id', id);
      node.className = 'feed-item-wrapper fade-in';
      node.innerHTML = newHtml;
    } else {
      if (node.innerHTML !== newHtml) {
        node.innerHTML = newHtml;
      }
    }

    if (!previousNode) {
      if (container.firstChild !== node) {
        container.insertBefore(node, container.firstChild);
      }
    } else {
      if (previousNode.nextSibling !== node) {
        container.insertBefore(node, previousNode.nextSibling);
      }
    }
    previousNode = node;
  });

  // Special handling to keep the intersection observer trigger at the very bottom
  let trigger = document.getElementById(newTriggerId);
  if (trigger && previousNode && trigger.previousSibling !== previousNode) {
    container.appendChild(trigger);
  }
}

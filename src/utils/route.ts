import Graph from 'node-dijkstra';
import {INodeData} from '../models/route';

export const route = (
  node: INodeData,
  start: string,
  end: string,
  avoid?: string[],
) => {
  const route = new Graph(node);
  const result = route.path(start, end, {cost: true, avoid: avoid});
  return result;
};

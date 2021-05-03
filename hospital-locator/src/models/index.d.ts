import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class HOSPITAL {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  constructor(init: ModelInit<HOSPITAL>);
  static copyOf(source: HOSPITAL, mutator: (draft: MutableModel<HOSPITAL>) => MutableModel<HOSPITAL> | void): HOSPITAL;
}
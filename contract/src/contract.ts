import { NearBindgen, near, call, view } from "near-sdk-js";

@NearBindgen({})
class Contract {
  num: number = 0;

  @view({})
  get_number(): number {
    return this.num;
  }

  @call({})
  increase_number(): void {
    near.log("Increase number by " + near.predecessorAccountId());
    this.num++;
  }

  // ({privateFunction:true}) -> 컨트랙트 소유자만 호출 가능
  @call({})
  decrease_number(): void {
    if (this.num == 0) {
      throw new Error("Can't decrease number");
    }
    near.log("Decrease number by " + near.predecessorAccountId());
    this.num--;
  }

  @call({ payableFunction: true })
  payable_fun(): void {
    near.log("User deposit amount: " + near.attachedDeposit());
    this.num += 10;
  }
}

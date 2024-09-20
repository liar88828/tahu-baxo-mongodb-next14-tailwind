import { dashboardController } from "@/server/controller/dashboard.controller";

let queryReq : | "getIdTransactionToday" | "getAllTransactionToday"

export async function GET(req : Request,) {
  if (queryReq === 'getAllTransactionToday') {
    dashboardController.getAllTransactionToday(req)
  }
  if (queryReq === 'getIdTransactionToday') {
    dashboardController.getIdTransactionToday(req)
  }
}

export async function PUT() {
  if (queryReq === 'getIdTransactionToday') {
  }
}

export async function DELETE(req : Request,) {
  if (queryReq === 'getIdTransactionToday') {
  }
}

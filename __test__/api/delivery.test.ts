import {testApiHandler} from "next-test-api-route-handler";
import {afterAll, beforeAll, describe, expect, it} from 'vitest';
import prisma from "@/lib/db/prisma";
import * as appHandler from "../../app/api/delivery/route"
import * as appHandlerParam from "../../app/api/delivery/[id]/route";
import {DeliveryDB} from "@prisma/client";
import {dataTestCreate, dataTestError, dataTestUpdate} from "@/__test__/utils/delivery";

let rootId: number;
describe.sequential('can test api delivery', async () => {
  beforeAll(async () => {
    // await prisma.
  })
  afterAll(async () => {
    await prisma.deliveryDB.deleteMany()
  })
  describe("POST can create Data Delivery", async () => {
    it("SUCCESS Create data delivery use mock", async () => {
      await testApiHandler({
        appHandler,
        test: async ({fetch}) => {
          const response = await fetch({
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dataTestCreate),
          });
          const json = await response.json();
          expect(response.status).toBe(200);
          expect(json).toMatchObject(dataTestCreate);
        },
      });
    })
  })

  describe("GET can find data Delivery", async () => {
    it("SUCCESS GET can get data delivery use mock", async () => {
      await testApiHandler({
        appHandler,
        test: async ({fetch}) => {
          const response = await fetch({method: "GET"});
          const json = await response.json();
          expect(response.status).toBe(200);
          expect(json).toMatchObject([dataTestCreate]);
        },
      });
    });

    it("SUCCESS GET can get data delivery by id  data use mock", async () => {
      const {id} = await prisma.deliveryDB.findFirst() as DeliveryDB
      await testApiHandler({
        params: {id: `${id}`},
        appHandler: appHandlerParam,
        test: async ({fetch}) => {
          const response = await fetch({method: "GET"});
          const json = await response.json();
          expect(response.status).toBe(200);
          expect(json).toMatchObject(dataTestCreate);
        },
      });
    });

    it("ERROR GET can get data delivery by id  data use mock, because wrong id ", async () => {
      await testApiHandler({
        params: {id: `wrong`},
        appHandler: appHandlerParam,
        test: async ({fetch}) => {
          const response = await fetch({method: "GET"});
          const json = await response.json();
          expect(response.status).toBe(400);
          expect(json).not.toMatchObject(dataTestCreate);
        },
      });
    });


  })

  describe("UPDATE can Update data Delivery", async () => {
    it("SUCCESS can update data delivery by id  data use mock", async () => {
      const {id} = await prisma.deliveryDB.findFirst() as DeliveryDB
      await testApiHandler({
        params: {id: `${id}`},
        appHandler: appHandlerParam,
        test: async ({fetch}) => {
          const response = await fetch({
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dataTestUpdate),
          });
          const json = await response.json();
          expect(response.status).toBe(200);
          expect(json).toMatchObject(dataTestUpdate);
        },
      });
    });

    it("ERROR can update data delivery by id data use mock, because wrong id", async () => {
      await testApiHandler({
        params: {id: `wrong`},
        appHandler: appHandlerParam,
        test: async ({fetch}) => {
          const response = await fetch({
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dataTestUpdate),
          });
          const json = await response.json();
          expect(response.status).toBe(400);
          expect(json).not.toMatchObject(dataTestUpdate);
        },
      });
    });


    it("ERROR can update data delivery by id data use mock, because wrong data", async () => {


      await testApiHandler({
        params: {id: `wrong`},
        appHandler: appHandlerParam,
        test: async ({fetch}) => {
          const response = await fetch({
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dataTestError),
          });
          const json = await response.json();
          expect(response.status).toBe(400);
          expect(json).not.toMatchObject(dataTestUpdate);
        },
      });
    });
  })

  describe("DELETE can Update data Delivery", async () => {
    it("SUCCESS can delete data delivery by id  data use mock", async () => {
      const {id} = await prisma.deliveryDB.findFirst() as DeliveryDB
      rootId = id
      await testApiHandler({
        params: {id: `${id}`},
        appHandler: appHandlerParam,
        test: async ({fetch}) => {
          const response = await fetch({
            method: "DELETE",
            headers: {'Content-Type': 'application/json'},

          });
          const json = await response.json();
          expect(response.status).toBe(200);
          expect(json).toMatchObject(dataTestUpdate);
        },
      });
    });

    it("ERROR can delete data delivery by id  data use mock, because has deleted", async () => {
      await testApiHandler({
        params: {id: `${rootId}`},
        appHandler: appHandlerParam,
        test: async ({fetch}) => {
          const response = await fetch({
            method: "DELETE",
            headers: {'Content-Type': 'application/json'},

          });
          const json = await response.json();
          expect(response.status).toBe(400);
          expect(response.status).not.toBe(200);
          expect(json).not.toMatchObject(dataTestUpdate);
        },
      });
    });

  })
})

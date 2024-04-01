import { request, response } from "express";
import Response from "./FormResponse.model.js";
export const ResponseActions = {
  AddNewResponese: async (req: request, res: response) => {
    try {
      let formId = req.params.id;
      let { singleResponse, timeStamp } = req.body;
      // console.log(req.body);
      let responseInDb = await Response.findOne({ FormId: formId });
      if (!responseInDb) {
        try {
          const newResponse = new Response({
            FormId: formId,
            Responses: [
              {
                timeStamp: timeStamp,
                response: singleResponse,
              },
            ],
          });
          await newResponse.save();
        } catch (e) {
          console.log(e);
        }
      } else {
        responseInDb.Responses.push({
          timeStamp: timeStamp,
          response: singleResponse,
        });
        await responseInDb.save();
      }
      res.status(201).send("Posted");
    } catch (e) {
      console.log(e);
      res.status(401).send(e);
    }
  },
  GetResponsesByFormId: async (req: request, res: response) => {
    try {
      let formid = req.params.id;
      let responsesInDb = await Response.findOne({ FormId: formid });
      if (!responsesInDb) {
        res.status(404).json({ message: "No responses found" });
        return;
      } else {
        res.status(200).send(responsesInDb.Responses);
      }
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  GetResponseByID: async (req: request, res: response) => {
    try {
      let formId = req.params.formId;
      let resId = req.params.resId;
      let responsesInDb = await Response.findOne({ FormId: formId });
      if (!responsesInDb) {
        res.status(404).send("No responses found");
      } else {
        let x = responsesInDb.Responses.filter((e) => e._id == resId);
        res.status(201).send(x);
      }
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  deleteResponseByID: async (req: request, res: response) => {
    try {
      let formId = req.params.formId;
      let resId = req.params.resId;
      let responsesInDb = await Response.findOne({
        FormId: formId,
      });
      if (!responsesInDb) {
        res.status(404).send("No responses found");
      } else {
        responsesInDb.Responses = responsesInDb.Responses.filter(
          (e) => e._id != resId
        ) as any;
        await responsesInDb.save();
      }
      res.status(201).send("deleted");
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  updateResponseByID: async (req: request, res: response) => {
    try {
      let formId = req.params.formId;
      let resId = req.params.resId;
      let { singleResponse, timeStamp } = req.body;
      // let resBody = req.body;
      let responsesInDb = await Response.findOne({ FormId: formId });
      if (!responsesInDb) {
        res.status(404).send("No responses found");
      } else {
        let x = responsesInDb.Responses.find((e) => e._id == resId);
        x.response = singleResponse;
        x.timeStamp = timeStamp;
        responsesInDb.Responses = responsesInDb.Responses.filter(
          (e) => e._id != resId
        ) as any;
        responsesInDb.Responses.push(x);
        await responsesInDb.save();
      }
      res.status(201).send("updated");
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

import { apiResponse } from "../../common";
import { roleDetailsModel } from "../../database/models/role_details";
import { tabMasterModel } from "../../database/models/tab_master";
import { responseMessage } from "../../helper";

const ObjectId = require('mongoose').Types.ObjectId

export const get_role_details_by_roleId = async (req, res) => {
    let {id} = req.params
    try {
        const finaldata = [];
        const tabs = await tabMasterModel.find({isDeleted : false}).lean()
      
        const roleDetails = await roleDetailsModel.find({ roleId: ObjectId(id) }).populate('filters.id').lean();
       
      for (let tab of tabs) {
        let obj:any ={}
        // obj =  {...tab, view : false, add : false, edit : false, delete : false}
        for (let rd of roleDetails) {
         
          if (rd.tabId.toString()=== tab._id.toString()) {
            obj.roleDetailsId = rd._id
            obj.add = rd.add;
            obj.edit = rd.edit;
            obj.view = rd.view;
            obj.delete = rd.delete;
            obj.filter = rd.filters
            obj = {...tab, ...obj}
          }
        }
        if(obj.roleDetailsId)
        finaldata.push(obj);
      }
      return res.status(200).json(new apiResponse(200,responseMessage?.getDataSuccess("get"),finaldata,{}));
    } catch (error) {
      console.log(error);
      return res.status(500).json(new apiResponse(500,responseMessage?.internalServerError,{},error));
    }
};
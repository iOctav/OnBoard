import { youtrackApi } from '../../app/services/youtrackApi';

export const extendedYoutrackApi = youtrackApi.injectEndpoints({
  endpoints: builder => ({
    getAgilesById: builder.query({
      query: (id) => ({
        url: `agiles/${id}`,
        params: {
          fields: 'backlog(availableRules(id),folderId,id,isUpdatable,name,query,updateableBy(id,name),visibleFor(id,name)),cardOnSeveralSprints,cardSettings(fields(field(fieldDefaults(bundle(id,isUpdateable)),fieldType(id,presentation,valueType),id,instances(project(id)),localizedName,name,type),id,presentation(id))),colorCoding(id,projectColors(color(id),id,project(id,name)),prototype(id,localizedName,name)),colorizeCustomFields,columnSettings(columns(collapsed,color($type,id),fieldValues(canUpdate,column(id),id,isResolved,name,ordinal,presentation),id,isResolved,isVisible,ordinal,parent($type,id),wipLimit($type,max,min)),field(fieldDefaults(bundle(id,isUpdateable)),fieldType(id,presentation,valueType),id,instances(project(id)),localizedName,name,type),id,showBundleWarning),currentSprint(id),estimationField($type,fieldType(id,valueType),id,name),extensions(reportSettings(doNotUseBurndown,estimationBurndownField,filterType(id),id,subQuery,yaxis(id))),flatBacklog,hideOrphansSwimlane,id,isDemo,isUpdatable,name,originalEstimationField($type,fieldType(id,valueType),id,name),orphansAtTheTop,owner(fullName,id,login,ringId),projects($type,archived,id,name,shortName,customFields(id,field(id,name,fieldType(id,isMultiValue,valueType)),emptyFieldText,canBeEmpty,bundle(id)),plugins(timeTrackingSettings(enabled,estimate(field(id,name),id),timeSpent(field(id,name),id))),ringId),readSharingSettings(permittedGroups(id,name),permittedUsers(id,login,name),projectBased),sprints(archived,finish,id,isDefault,isStarted,name,start),sprintsSettings(addNewIssueToKanban,cardOnSeveralSprints,defaultSprint($type,id,name),disableSprints,explicitQuery,hideSubtasksOfCards,isExplicit,sprintSyncField(fieldType(isMultiValue),id,localizedName,name)),status(errors,hasJobs,valid,warnings),swimlaneSettings($type,defaultCardType(id,name),enabled,field(customField(fieldDefaults(bundle(id,isUpdateable)),fieldType(id,presentation,valueType),id,instances(project(id)),localizedName,name,type),id,instant,multiValue,name,presentation),id,values(id,isResolved,name,presentation,value)),updateSharingSettings(permittedGroups(id,name,teamForProject(id)),permittedUsers(id,login,name),projectBased)',
        },
      })
    }),
  })
})

export const { useGetAgilesByIdQuery } = extendedYoutrackApi

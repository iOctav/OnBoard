import { createEntityAdapter, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { youtrackApi } from '../../app/services/youtrackApi';
import { calculateSwimlaneType } from '../../utils/swimlanesUtils';
import { v4 as uuidv4 } from 'uuid';
import { DateSwimlanePastPeriods, DateSwimlanePeriods, getDateFieldType } from '../customFields/dateFieldUtils';
import { DatePeriodType } from '../customFields/date-period-type';

export const extendedYoutrackApi = youtrackApi.injectEndpoints({
  endpoints: builder => ({
    updateGeneralSwimlaneSettings: builder.mutation({
      query: ({ agileId, ...patch }) => ({
        url: `agiles/${agileId}`,
        method: 'POST',
        body: patch,
        params: {
          fields: '$type, id',
          muteUpdateNotifications: true,
        }
      }),
      invalidatesTags: ['Board'],
    }),
  })
})

export const { useUpdateGeneralSwimlaneSettingsMutation } = extendedYoutrackApi

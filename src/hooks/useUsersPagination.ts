import { useEffect, useState } from 'react';
import { useDispatch, useSelector} from "react-redux";
import { usersApi } from '../services/users';
import { AppDispatch } from '../store/store';
import type { User } from '../types/User';
import { ITEMS_PER_PAGE, SLICES_PER_PAGE } from '../constants';
import {selectSearchText, selectUIOutdated, selectUserList, sendOutdatedSignal, setList} from '../store/userSlice';


interface Props {
  page: number;
  setPage: (newPage: number) => void;
}

interface PaginationInfo {
  total: number;
  pageSize: number;
  current: number;
  showSizeChanger: boolean;
  showTitle: boolean;
  position: ['bottomCenter'],
}

interface Response {
  paginationInfo: PaginationInfo;
  users: User[];
  isLoading: boolean;
  error: any;
  forceRender: () => void;
}

const defaultPagination: PaginationInfo = {
  total: 1,
  pageSize: ITEMS_PER_PAGE,
  current: 1,
  showSizeChanger: false,
  showTitle: true,
  position: ['bottomCenter']
}

export const useUsersPagination = ({ page, setPage }: Props): Response => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector(selectUserList);
  const searchText = useSelector(selectSearchText);
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>(defaultPagination);
  const [isLoading, setIsLoading] = useState(true);
  const UIOutdated = useSelector(selectUIOutdated);

  const forceRender = () => dispatch(sendOutdatedSignal(Date.now()));

  useEffect(() => {
    setIsLoading(true);
    const initialSlice = (page - 1) * SLICES_PER_PAGE + 1
    const finalSlice = page * SLICES_PER_PAGE;

    const requestData = async () => {
      let promises = [];
      for(let i=initialSlice; i<= finalSlice; i++) {
        promises.push(dispatch(usersApi.endpoints.getSliceUsers.initiate({ page: i, search: searchText }, { forceRefetch: true })))
      }

      const answers = await Promise.all(promises);

      const reducedInfo = answers.reduce((accum, answer) => {
        if (answer && answer.data) {
          if (answer.data.totalItems > accum.totalItems){
            accum.totalItems = answer.data.totalItems;
          }
          accum.list =  accum.list.concat(answer.data.list);
        }

        return accum;
      }, { list: [] as User[], totalItems: 0 });


      setPaginationInfo({
        ...defaultPagination,
        current: page,
        total: reducedInfo.totalItems,
        pageSize: ITEMS_PER_PAGE,
      })

      dispatch(setList(reducedInfo.list))
      setIsLoading(false);
    };

    requestData();
  }, [page, searchText, UIOutdated])

  useEffect(() => {
    setPage(1)
  }, [searchText]);

  return {
    users,
    paginationInfo,
    isLoading,
    error: undefined,
    forceRender
  }
}
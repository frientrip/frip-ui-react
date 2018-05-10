import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import List from './';
import { ButtonPrimary } from '../Button';

const data = [
  {
    "productId": 26157,
    "title": "수량 테스트용 프립 (일정+옵션)",
    "catchPhrase": "어디한번 결제와 취소가 잘 되나 확인해볼까",
    "productItineraryId": 3,
    "startDate": "2018-03-03T11:00:00.000Z",
    "endDate": "2018-03-03T15:00:00.000Z",
    "purchaseCount": 0,
    "useCount": 0
  },
  {
    "productId": 26157,
    "title": "수량 테스트용 프립 (일정+옵션)",
    "catchPhrase": "어디한번 결제와 취소가 잘 되나 확인해볼까",
    "productItineraryId": 11,
    "startDate": "2018-02-28T11:00:00.000Z",
    "endDate": "2018-02-28T15:00:00.000Z",
    "purchaseCount": 6,
    "useCount": 1
  },
  {
    "productId": 26157,
    "title": "수량 테스트용 프립 (일정+옵션)",
    "catchPhrase": "어디한번 결제와 취소가 잘 되나 확인해볼까",
    "productItineraryId": 10,
    "startDate": "2018-02-27T11:00:00.000Z",
    "endDate": "2018-02-27T15:00:00.000Z",
    "purchaseCount": 6,
    "useCount": 0
  },
  {
    "productId": 26157,
    "title": "수량 테스트용 프립 (일정+옵션)",
    "catchPhrase": "어디한번 결제와 취소가 잘 되나 확인해볼까",
    "productItineraryId": 9,
    "startDate": "2018-02-26T11:00:00.000Z",
    "endDate": "2018-02-25T15:00:00.000Z",
    "purchaseCount": 0,
    "useCount": 0
  },
  {
    "productId": 26157,
    "title": "수량 테스트용 프립 (일정+옵션)",
    "catchPhrase": "어디한번 결제와 취소가 잘 되나 확인해볼까",
    "productItineraryId": 8,
    "startDate": "2018-02-25T11:00:00.000Z",
    "endDate": "2018-02-08T15:00:00.000Z",
    "purchaseCount": 0,
    "useCount": 0
  },
  {
    "productId": 26157,
    "title": "수량 테스트용 프립 (일정+옵션)",
    "catchPhrase": "어디한번 결제와 취소가 잘 되나 확인해볼까",
    "productItineraryId": 7,
    "startDate": "2018-02-24T11:00:00.000Z",
    "endDate": "2018-02-24T15:00:00.000Z",
    "purchaseCount": 0,
    "useCount": 0
  },
  {
    "productId": 26157,
    "title": "수량 테스트용 프립 (일정+옵션)",
    "catchPhrase": "어디한번 결제와 취소가 잘 되나 확인해볼까",
    "productItineraryId": 6,
    "startDate": "2018-02-06T11:00:00.000Z",
    "endDate": "2018-02-06T15:00:00.000Z",
    "purchaseCount": 0,
    "useCount": 0
  },
  {
    "productId": 26157,
    "title": "수량 테스트용 프립 (일정+옵션)",
    "catchPhrase": "어디한번 결제와 취소가 잘 되나 확인해볼까",
    "productItineraryId": 5,
    "startDate": "2018-02-05T11:00:00.000Z",
    "endDate": "2018-02-05T15:00:00.000Z",
    "purchaseCount": 0,
    "useCount": 0
  },
  {
    "productId": 26157,
    "title": "수량 테스트용 프립 (일정+옵션)",
    "catchPhrase": "어디한번 결제와 취소가 잘 되나 확인해볼까",
    "productItineraryId": 4,
    "startDate": "2018-02-04T11:00:00.000Z",
    "endDate": "2018-02-04T15:00:00.000Z",
    "purchaseCount": 0,
    "useCount": 0
  },
  {
    "productId": 26157,
    "title": "수량 테스트용 프립 (일정+옵션)",
    "catchPhrase": "어디한번 결제와 취소가 잘 되나 확인해볼까",
    "productItineraryId": 2,
    "startDate": "2018-02-02T11:00:00.000Z",
    "endDate": "2018-02-02T15:00:00.000Z",
    "purchaseCount": 0,
    "useCount": 0
  },
  {
    "productId": 26157,
    "title": "수량 테스트용 프립 (일정+옵션)",
    "catchPhrase": "어디한번 결제와 취소가 잘 되나 확인해볼까",
    "productItineraryId": 13,
    "startDate": "2018-02-02T05:00:00.000Z",
    "endDate": "2018-02-02T09:00:00.000Z",
    "purchaseCount": 0,
    "useCount": 0
  },
  {
    "productId": 26157,
    "title": "수량 테스트용 프립 (일정+옵션)",
    "catchPhrase": "어디한번 결제와 취소가 잘 되나 확인해볼까",
    "productItineraryId": 1,
    "startDate": "2018-02-01T11:00:00.000Z",
    "endDate": "2018-02-01T15:00:00.000Z",
    "purchaseCount": 0,
    "useCount": 0
  }
];

const columns = [
  {
    Header: 'ID',
    accessor: 'productId', // String-based value accessors!
  }, {
    Header: '제목',
    accessor: 'title',
  }, {
    id: 'purchaseCount', // Required because our accessor is not a string
    Header: '구매 수량',
    accessor: d => d.purchaseCount, // Custom value accessors!
  }, {
    Header: () => <span>사용 수량</span>, // Custom header components!
    accessor: 'useCount',
  },
];

storiesOf('List', module)
  .add('Demo', () => (
    <List
      data={data}
      columns={columns}
    />
  ));

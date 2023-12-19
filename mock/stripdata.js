export default [
  {
    url: '/dev_api/queryStrip',
    method: 'get',
    response: ({ body }) => {
      console.log('body>>>>>>>>', body)
      return {
        code: 200,

        data: {
          ArrtableData: {
            data1:
              [{
                strip1: 'CYH4183',
                strip2: 'H360',
                strip3: 'P/B',
                agreeShow1: false,		
                strip4: '01/28  1500',
                switch10: 1,
                agreeShow10: false,
                agreeShow20: false,
                agreeShow30: false,
                agreeShow40: false,
    
              }, {
                strip1: 'B737 M A2230',
                strip4: 'K1',
              }, {
                strip1: `ZBAA 1555/1827 ZBHH`,
                strip4: 'VIP',
              }],
            data2:
              [{
                strip1: 'ZH9521',
                strip2: 'H360',
                strip3: 'P/B',
                agreeShow1: false,
    
                strip4: '01/28  1500',
                agreeShow: true,
              }, {
                strip1: 'B737 M A2230',
                strip4: 'K1',
              }, {
                strip1: 'ZGCS 1555/1827 ZGDY',
                strip4: 'VIP',
              }],
            data3:
              [{
                strip1: 'ZH9522',
                strip2: 'H360',
                strip3: 'P/B',
                agreeShow1: false,
    
                strip4: '01/28  1500',
                agreeShow: true,
              }, {
                strip1: 'B737 M A2230',
                strip4: 'K1',
              }, {
                strip1: 'ZPPP 1555/1827 ZBAA',
                strip4: 'VIP',
              }],
    
          },
          DeptableData: {
            data1:
              [{
                strip1: 'CRK305',
                strip2: 'H0',
                strip3: 'P/B',
                agreeShow1: false,
                agreeShow2: false,
                agreeShow3: false,
                strip4: '01/28  1500',
                agreeShow10: false,
                agreeShow20: false,
                agreeShow30: false,
                agreeShow40: false,
                agreeShow: true,
              }, {
                strip1: 'A333 H 0100',
                strip4: 'K1',
              }, {
                strip1: 'ZTTT 0800/1100 VHHH',
                strip4: 'VIP',
              }],
            data2:
              [{
                strip1: 'CYH4183',
                strip2: 'H0',
                strip3: 'P/B',
                agreeShow1: false,
                agreeShow2: false,
                agreeShow3: false,
                strip4: '01/28  1500',
                agreeShow: true,
              }, {
                strip1: 'B737 M A2230',
                strip4: 'K1',
              }, {
                strip1: 'ZBTJ 1555/1827 ZBAA',
                strip4: 'VIP',
              }],
            data3:
              [{
                strip1: '9H8371',
                strip2: 'H0',
                strip3: 'P/B',
                agreeShow1: false,
                agreeShow2: false,
                agreeShow3: false,
                strip4: '01/28  1500',
                agreeShow: true,
              }, {
                strip1: 'B737 M A2230',
                strip4: 'K1',
              }, {
                strip1: 'ZBSL 1555/1827 ZBAA',
                strip4: 'VIP',
              }]
          }

        },

      }
    }
  }
]

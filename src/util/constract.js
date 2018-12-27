const address = '0x5e9628380eaabe170c66a5e25a6ab3b19363c345'

const coinbase = '0xb739b7552705db7c47b896bd73cca028ed7552fc'

const FacABI = [
  {
    'constant': false,
    'inputs': [
      {
        'name': 'name',
        'type': 'string'
      },
      {
        'name': 'theme',
        'type': 'string'
      },
      {
        'name': 'owner',
        'type': 'string'
      },
      {
        'name': 'time',
        'type': 'string'
      }
    ],
    'name': 'createObject',
    'outputs': [
      {
        'name': '_objectAddress',
        'type': 'address'
      }
    ],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'getAllContracts',
    'outputs': [
      {
        'name': '',
        'type': 'address[]'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  }
]

const ComABI = [
  {
    'constant': true,
    'inputs': [],
    'name': 'getAllComments',
    'outputs': [
      {
        'components': [
          {
            'name': 'name',
            'type': 'string'
          },
          {
            'name': 'comment',
            'type': 'string'
          },
          {
            'name': 'ctime',
            'type': 'string'
          },
          {
            'name': 'score',
            'type': 'string'
          }
        ],
        'name': '_comments',
        'type': 'tuple[]'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': 'commentUser',
        'type': 'string'
      },
      {
        'name': 'comment',
        'type': 'string'
      },
      {
        'name': 'score',
        'type': 'string'
      },
      {
        'name': 'ctime',
        'type': 'string'
      }
    ],
    'name': 'setComment',
    'outputs': [],
    'payable': true,
    'stateMutability': 'payable',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'getObjectInfo',
    'outputs': [
      {
        'components': [
          {
            'name': 'name',
            'type': 'string'
          },
          {
            'name': 'owner',
            'type': 'string'
          },
          {
            'name': 'ctime',
            'type': 'string'
          },
          {
            'name': 'theme',
            'type': 'string'
          },
          {
            'name': 'num',
            'type': 'uint256'
          }
        ],
        'name': '_info',
        'type': 'tuple'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'name': '_name',
        'type': 'string'
      },
      {
        'name': '_theme',
        'type': 'string'
      },
      {
        'name': '_owner',
        'type': 'string'
      },
      {
        'name': '_time',
        'type': 'string'
      }
    ],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'constructor'
  }
]

export { coinbase, address, FacABI, ComABI }

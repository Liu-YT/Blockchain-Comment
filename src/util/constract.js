const address = '0x8fe6201c3937d19f179e952a9b75977bacdc9019'
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
        'type': 'int256'
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
            'type': 'int256'
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
    'constant': true,
    'inputs': [],
    'name': 'getObjectName',
    'outputs': [
      {
        'name': '_name',
        'type': 'string'
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

export { address, FacABI, ComABI }

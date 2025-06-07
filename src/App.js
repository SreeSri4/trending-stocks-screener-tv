import React, { useState, useEffect } from 'react';
import { ChevronDown, RefreshCw, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

const TrendingStocksScreener = () => {
  const [selectedCriteria, setSelectedCriteria] = useState('Volume Buzzers');
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const dropdownOptions = [
    '52 week High',
    '1 Month High', 
    'Volume Buzzers',
    '100% up in a Year'
  ];

  // API payloads for different screener types
  const getPayloadForCriteria = (criteria) => {
    const payloads = {
      'Volume Buzzers': {
        "columns": [
          "name",
          "description",
          "close",
          "change",
          "volume",
          "relative_volume",
          "SMA20",
          "market_cap_basic",
          "sector"
        ],
        "filter": [
          {
            "left": "close",
            "operation": "egreater",
            "right": 30
          },
          {
            "left": "country",
            "operation": "in_range",
            "right": ["India"]
          },
          {
            "left": "exchange",
            "operation": "in_range",
            "right": ["NSE"]
          },
          {
            "left": "average_volume_60d_calc",
            "operation": "greater",
            "right": 100000
          },
          {
            "left": "change",
            "operation": "greater",
            "right": 3
          },
          {
            "left": "relative_volume_10d_calc",
            "operation": "greater",
            "right": 3
          },
          {
            "left": "market_cap_basic",
            "operation": "egreater",
            "right": 8000000000
          }
        ],
        "ignore_unknown_fields": false,
        "options": {
          "lang": "en"
        },
        "range": [0, 100],
        "sort": {
          "sortBy": "market_cap_basic",
          "sortOrder": "desc"
        },
        "symbols": {},
        "markets": ["india"],
        "filter2": {
          "operator": "and",
          "operands": [
            {
              "operation": {
                "operator": "or",
                "operands": [
                  {
                    "operation": {
                      "operator": "and",
                      "operands": [
                        {
                          "expression": {
                            "left": "type",
                            "operation": "equal",
                            "right": "stock"
                          }
                        },
                        {
                          "expression": {
                            "left": "typespecs",
                            "operation": "has",
                            "right": ["common"]
                          }
                        }
                      ]
                    }
                  }
                ]
              }
            },
            {
              "operation": {
                "operator": "or",
                "operands": [
                  {
                    "operation": {
                      "operator": "and",
                      "operands": [
                        {
                          "expression": {
                            "left": "type",
                            "operation": "equal",
                            "right": "stock"
                          }
                        },
                        {
                          "expression": {
                            "left": "typespecs",
                            "operation": "has",
                            "right": ["common"]
                          }
                        }
                      ]
                    }
                  },
                  {
                    "operation": {
                      "operator": "and",
                      "operands": [
                        {
                          "expression": {
                            "left": "type",
                            "operation": "equal",
                            "right": "stock"
                          }
                        },
                        {
                          "expression": {
                            "left": "typespecs",
                            "operation": "has",
                            "right": ["preferred"]
                          }
                        }
                      ]
                    }
                  },
                  {
                    "operation": {
                      "operator": "and",
                      "operands": [
                        {
                          "expression": {
                            "left": "type",
                            "operation": "equal",
                            "right": "dr"
                          }
                        }
                      ]
                    }
                  },
                  {
                    "operation": {
                      "operator": "and",
                      "operands": [
                        {
                          "expression": {
                            "left": "type",
                            "operation": "equal",
                            "right": "fund"
                          }
                        },
                        {
                          "expression": {
                            "left": "typespecs",
                            "operation": "has_none_of",
                            "right": ["etf"]
                          }
                        }
                      ]
                    }
                  }
                ]
              }
            }
          ]
        }
      },
      '52 week High': {
        "columns": [
          "name",
          "description",
          "close",
          "change",
          "volume",
          "relative_volume",
          "SMA20",
          "market_cap_basic",
          "sector"
        ],
        "filter": [
          {
            "left": "country",
            "operation": "in_range",
            "right": ["India"]
          },
          {
            "left": "close",
            "operation": "egreater",
            "right": 30
          },
          {
            "left": "exchange",
            "operation": "in_range",
            "right": ["NSE"]
          },
          {
            "left": "average_volume_60d_calc",
            "operation": "greater",
            "right": 100000
          },
          {
            "left": "price_52_week_high",
            "operation": "eless",
            "right": "high"
          },
          {
            "left": "market_cap_basic",
            "operation": "egreater",
            "right": 8000000000
          },
          {
            "left": "is_primary",
            "operation": "equal",
            "right": true
          }
        ],
        "ignore_unknown_fields": false,
        "options": {
          "lang": "en"
        },
        "range": [0, 100],
        "sort": {
          "sortBy": "market_cap_basic",
          "sortOrder": "desc"
        },
        "symbols": {},
        "markets": ["india"],
        "filter2": {
          "operator": "and",
          "operands": [
            {
              "operation": {
                "operator": "or",
                "operands": [
                  {
                    "operation": {
                      "operator": "and",
                      "operands": [
                        {
                          "expression": {
                            "left": "type",
                            "operation": "equal",
                            "right": "stock"
                          }
                        },
                        {
                          "expression": {
                            "left": "typespecs",
                            "operation": "has",
                            "right": ["common"]
                          }
                        }
                      ]
                    }
                  }
                ]
              }
            },
            {
              "operation": {
                "operator": "or",
                "operands": [
                  {
                    "operation": {
                      "operator": "and",
                      "operands": [
                        {
                          "expression": {
                            "left": "type",
                            "operation": "equal",
                            "right": "stock"
                          }
                        },
                        {
                          "expression": {
                            "left": "typespecs",
                            "operation": "has",
                            "right": ["common"]
                          }
                        }
                      ]
                    }
                  },
                  {
                    "operation": {
                      "operator": "and",
                      "operands": [
                        {
                          "expression": {
                            "left": "type",
                            "operation": "equal",
                            "right": "stock"
                          }
                        },
                        {
                          "expression": {
                            "left": "typespecs",
                            "operation": "has",
                            "right": ["preferred"]
                          }
                        }
                      ]
                    }
                  },
                  {
                    "operation": {
                      "operator": "and",
                      "operands": [
                        {
                          "expression": {
                            "left": "type",
                            "operation": "equal",
                            "right": "dr"
                          }
                        }
                      ]
                    }
                  },
                  {
                    "operation": {
                      "operator": "and",
                      "operands": [
                        {
                          "expression": {
                            "left": "type",
                            "operation": "equal",
                            "right": "fund"
                          }
                        },
                        {
                          "expression": {
                            "left": "typespecs",
                            "operation": "has_none_of",
                            "right": ["etf"]
                          }
                        }
                      ]
                    }
                  }
                ]
              }
            }
          ]
        }
      },
      '1 Month High': {
        "columns": [
          "name",
          "description",
          "close",
          "change",
          "volume",
          "relative_volume",
          "SMA20",
          "market_cap_basic",
          "sector"
        ],
        "filter": [
          {
            "left": "country",
            "operation": "in_range",
            "right": ["India"]
          },
          {
            "left": "exchange",
            "operation": "in_range",
            "right": ["NSE"]
          },
          {
            "left": "close",
            "operation": "egreater",
            "right": 30
          },
          {
            "left": "average_volume_60d_calc",
            "operation": "greater",
            "right": 100000
          },
          {
            "left": "High.1M",
            "operation": "eless",
            "right": "high"
          },
          {
            "left": "market_cap_basic",
            "operation": "egreater",
            "right": 8000000000
          }
        ],
        "ignore_unknown_fields": false,
        "options": {
          "lang": "en"
        },
        "range": [0, 100],
        "sort": {
          "sortBy": "market_cap_basic",
          "sortOrder": "desc"
        },
        "symbols": {},
        "markets": ["india"],
        "filter2": {
          "operator": "and",
          "operands": [
            {
              "operation": {
                "operator": "or",
                "operands": [
                  {
                    "operation": {
                      "operator": "and",
                      "operands": [
                        {
                          "expression": {
                            "left": "type",
                            "operation": "equal",
                            "right": "stock"
                          }
                        },
                        {
                          "expression": {
                            "left": "typespecs",
                            "operation": "has",
                            "right": ["common"]
                          }
                        }
                      ]
                    }
                  }
                ]
              }
            },
            {
              "operation": {
                "operator": "or",
                "operands": [
                  {
                    "operation": {
                      "operator": "and",
                      "operands": [
                        {
                          "expression": {
                            "left": "type",
                            "operation": "equal",
                            "right": "stock"
                          }
                        },
                        {
                          "expression": {
                            "left": "typespecs",
                            "operation": "has",
                            "right": ["common"]
                          }
                        }
                      ]
                    }
                  },
                  {
                    "operation": {
                      "operator": "and",
                      "operands": [
                        {
                          "expression": {
                            "left": "type",
                            "operation": "equal",
                            "right": "stock"
                          }
                        },
                        {
                          "expression": {
                            "left": "typespecs",
                            "operation": "has",
                            "right": ["preferred"]
                          }
                        }
                      ]
                    }
                  },
                  {
                    "operation": {
                      "operator": "and",
                      "operands": [
                        {
                          "expression": {
                            "left": "type",
                            "operation": "equal",
                            "right": "dr"
                          }
                        }
                      ]
                    }
                  },
                  {
                    "operation": {
                      "operator": "and",
                      "operands": [
                        {
                          "expression": {
                            "left": "type",
                            "operation": "equal",
                            "right": "fund"
                          }
                        },
                        {
                          "expression": {
                            "left": "typespecs",
                            "operation": "has_none_of",
                            "right": ["etf"]
                          }
                        }
                      ]
                    }
                  }
                ]
              }
            }
          ]
        }
      },
      '100% up in a Year': {
        "columns": [
          "name",
          "description",
          "close",
          "change",
          "volume",
          "relative_volume",
          "SMA20",
          "market_cap_basic",
          "sector"
        ],
        "filter": [
          {
            "left": "country",
            "operation": "in_range",
            "right": ["India"]
          },
          {
            "left": "exchange",
            "operation": "in_range",
            "right": ["NSE"]
          },
          {
            "left": "close",
            "operation": "egreater",
            "right": 30
          },
          {
            "left": "average_volume_60d_calc",
            "operation": "greater",
            "right": 100000
          },
          {
            "left": "market_cap_basic",
            "operation": "egreater",
            "right": 8000000000
          },
          {
            "left": "Perf.Y",
            "operation": "greater",
            "right": 100
          }
        ],
        "ignore_unknown_fields": false,
        "options": {
          "lang": "en"
        },
        "range": [0, 100],
        "sort": {
          "sortBy": "market_cap_basic",
          "sortOrder": "desc"
        },
        "symbols": {},
        "markets": ["india"],
        "filter2": {
          "operator": "and",
          "operands": [
            {
              "operation": {
                "operator": "or",
                "operands": [
                  {
                    "operation": {
                      "operator": "and",
                      "operands": [
                        {
                          "expression": {
                            "left": "type",
                            "operation": "equal",
                            "right": "stock"
                          }
                        },
                        {
                          "expression": {
                            "left": "typespecs",
                            "operation": "has",
                            "right": ["common"]
                          }
                        }
                      ]
                    }
                  }
                ]
              }
            },
            {
              "operation": {
                "operator": "or",
                "operands": [
                  {
                    "operation": {
                      "operator": "and",
                      "operands": [
                        {
                          "expression": {
                            "left": "type",
                            "operation": "equal",
                            "right": "stock"
                          }
                        },
                        {
                          "expression": {
                            "left": "typespecs",
                            "operation": "has",
                            "right": ["common"]
                          }
                        }
                      ]
                    }
                  },
                  {
                    "operation": {
                      "operator": "and",
                      "operands": [
                        {
                          "expression": {
                            "left": "type",
                            "operation": "equal",
                            "right": "stock"
                          }
                        },
                        {
                          "expression": {
                            "left": "typespecs",
                            "operation": "has",
                            "right": ["preferred"]
                          }
                        }
                      ]
                    }
                  },
                  {
                    "operation": {
                      "operator": "and",
                      "operands": [
                        {
                          "expression": {
                            "left": "type",
                            "operation": "equal",
                            "right": "dr"
                          }
                        }
                      ]
                    }
                  },
                  {
                    "operation": {
                      "operator": "and",
                      "operands": [
                        {
                          "expression": {
                            "left": "type",
                            "operation": "equal",
                            "right": "fund"
                          }
                        },
                        {
                          "expression": {
                            "left": "typespecs",
                            "operation": "has_none_of",
                            "right": ["etf"]
                          }
                        }
                      ]
                    }
                  }
                ]
              }
            }
          ]
        }
      }
    };
    return payloads[criteria] || payloads['Volume Buzzers'];
  };

  const fetchStocks = async (criteria) => {
    setLoading(true);
    setError(null);
    
    try {
      const payload = getPayloadForCriteria(criteria);
      
      const response = await fetch('https://scanner.tradingview.com/india/scan?label-product=popup-screener-stock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
          'Access-Control-Allow-Credentials': 'true'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Process the TradingView API response
      if (data && data.data) {
        const processedStocks = data.data.map((stock, index) => {
          const stockData = stock.d || [];
          return {
            symbol: stockData[0] || 'N/A', // name
            description: stockData[1] || '', // description
            price: stockData[2] || 0, // close
            change: stockData[3] || 0, // change
            volume: stockData[4] || 0, // volume
            rvol: stockData[5] ? parseFloat(stockData[5]).toFixed(2) : '-', // relative_volume
            sma20: stockData[6] ? parseFloat(stockData[6]).toFixed(2) : '-', // SMA20
            marketCap: stockData[7] || 0, // market_cap_basic
            sector: stockData[8] || 'Finance', // sector
            smaDistance: stockData[6] && stockData[2] ? 
              ((stockData[2] - stockData[6]) / stockData[6] * 100) : 0 // Calculate SMA distance
          };
        });
        setStocks(processedStocks);
      } else {
        setStocks([]);
      }
      setLastUpdated(new Date());
      
    } catch (err) {
      setError(err.message);
      console.error('Error fetching stocks:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStocks(selectedCriteria);
    setSortConfig({ key: null, direction: 'asc' });
  }, [selectedCriteria]);

  const handleCriteriaChange = (criteria) => {
    setSelectedCriteria(criteria);
  };

  const handleRefresh = () => {
    fetchStocks(selectedCriteria);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortedStocks = () => {
    if (!sortConfig.key) return stocks;

    const sortedStocks = [...stocks].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      // Handle different data types
      if (sortConfig.key === 'symbol' || sortConfig.key === 'sector') {
        // String comparison
        aValue = aValue.toString().toLowerCase();
        bValue = bValue.toString().toLowerCase();
      } else {
        // Numeric comparison
        aValue = parseFloat(aValue) || 0;
        bValue = parseFloat(bValue) || 0;
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return sortedStocks;
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return <ArrowUpDown className="w-4 h-4 text-gray-400" />;
    }
    return sortConfig.direction === 'asc' ? 
      <ArrowUp className="w-4 h-4 text-blue-600" /> : 
      <ArrowDown className="w-4 h-4 text-blue-600" />;
  };

  const formatValue = (value, type) => {
    if (value === null || value === undefined) return '-';
    
    switch (type) {
      case 'price':
        return `₹${value.toFixed(2)}`;
      case 'change':
        return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
      case 'volume':
            if (value >= 1000000000) {
              return `${(value / 1000000000).toFixed(1)}B`;
            } else if (value >= 1000000) {
              return `${(value / 1000000).toFixed(1)}M`;
            } else if (value >= 1000) {
              return `${(value / 1000).toFixed(1)}K`;
            }
            return value.toString();
      case 'marketCap':
            if (value >= 1000000000000) {
              return `₹${(value / 1000000000000).toFixed(2)}T`;
            } else if (value >= 1000000000) {
              return `₹${(value / 1000000000).toFixed(1)}B`;
            } else if (value >= 1000000) {
              return `₹${(value / 1000000).toFixed(1)}M`;
            }
            return `₹${value.toLocaleString("en-IN")}`;
      default:
        return value;
    }
  };

  const sortedStocks = getSortedStocks();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Trending Stocks Screener</h1>
          <div className="text-sm text-gray-500">
            Last updated: {lastUpdated.toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit',
              timeZoneName: 'short'
            })}
          </div>
        </div>

        {/* Stock Screener Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Stock Screener</h2>
              <p className="text-gray-600">Select a screening criteria to filter stocks</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">Screening Criteria</div>
              <div className="relative">
                <select 
                  value={selectedCriteria}
                  onChange={(e) => handleCriteriaChange(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-48"
                >
                  {dropdownOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
              
              <button
                onClick={handleRefresh}
                disabled={loading}
                className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50"
              >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">{selectedCriteria}</h3>
              <div className="text-sm text-gray-500">
                {sortedStocks.length} stocks found
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <p className="text-red-700">Error: {error}</p>
              </div>
            )}

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <RefreshCw className="w-8 h-8 animate-spin text-blue-500" />
                <span className="ml-2 text-gray-600">Loading stocks...</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                   <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        <button
                          onClick={() => handleSort('symbol')}
                          className="flex items-center gap-2 hover:text-gray-900 focus:outline-none"
                        >
                          Symbol
                          {getSortIcon('symbol')}
                        </button>
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        <button
                          onClick={() => handleSort('price')}
                          className="flex items-center gap-2 hover:text-gray-900 focus:outline-none"
                        >
                          Price
                          {getSortIcon('price')}
                        </button>
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        <button
                          onClick={() => handleSort('change')}
                          className="flex items-center gap-2 hover:text-gray-900 focus:outline-none"
                        >
                          Change
                          {getSortIcon('change')}
                        </button>
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        <button
                          onClick={() => handleSort('volume')}
                          className="flex items-center gap-2 hover:text-gray-900 focus:outline-none"
                        >
                          Volume
                          {getSortIcon('volume')}
                        </button>
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        <button
                          onClick={() => handleSort('rvol')}
                          className="flex items-center gap-2 hover:text-gray-900 focus:outline-none"
                        >
                          RVol 10D
                          {getSortIcon('rvol')}
                        </button>
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        <button
                          onClick={() => handleSort('sma20')}
                          className="flex items-center gap-2 hover:text-gray-900 focus:outline-none"
                        >
                          SMA20
                          {getSortIcon('sma20')}
                        </button>
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        <button
                          onClick={() => handleSort('smaDistance')}
                          className="flex items-center gap-2 hover:text-gray-900 focus:outline-none"
                        >
                          SMA Distance
                          {getSortIcon('smaDistance')}
                        </button>
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        <button
                          onClick={() => handleSort('marketCap')}
                          className="flex items-center gap-2 hover:text-gray-900 focus:outline-none"
                        >
                          MCap
                          {getSortIcon('marketCap')}
                        </button>
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        <button
                          onClick={() => handleSort('sector')}
                          className="flex items-center gap-2 hover:text-gray-900 focus:outline-none"
                        >
                          Sector
                          {getSortIcon('sector')}
                        </button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    { sortedStocks.length > 0 ? (
                      sortedStocks.map((stock, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <span className="text-blue-600 font-medium">{stock.symbol || 'N/A'}</span>
                          </td>
                          <td className="py-3 px-4">{formatValue(stock.price, 'price')}</td>
                          <td className="py-3 px-4">
                            <span className={`${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {formatValue(stock.change, 'change')}
                            </span>
                          </td>
                          <td className="py-3 px-4">{formatValue(stock.volume, 'volume')}</td>
                          <td className="py-3 px-4">{stock.rvol || '-'}</td>
                          <td className="py-3 px-4">{stock.sma20 || '-'}</td>
                          <td className="py-3 px-4">
                            <span className={`${stock.smaDistance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {stock.smaDistance ? `${stock.smaDistance > 0 ? '+' : ''}${stock.smaDistance.toFixed(2)}%` : '-'}
                            </span>
                          </td>
                          <td className="py-3 px-4">{formatValue(stock.marketCap, 'marketCap')}</td>
                          <td className="py-3 px-4">{stock.sector || 'Finance'}</td>
                        </tr>
                      ))
                    ) : (
                      !loading && (
                        <tr>
                          <td colSpan="9" className="py-8 text-center text-gray-500">
                            No stocks found for the selected criteria
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingStocksScreener;

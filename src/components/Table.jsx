import React, { useState, useEffect } from 'react';
import { Table } from 'antd';

const ObjectsTable = props => {
  const {
    results,
    pagination,
    loading,
    onChangeParams,
    sortedField,
    onChangePage,
    columns,
    ...otherTableParams
  } = props;

  const handleTableChange = (currentPagination, filters, sorter) => {
    /**
     * Listen to table change for manager pagination and ordering.
     */
    console.log("Change pagination ")
    console.log("pagination", pagination);
    console.log("CurrentPagination ", currentPagination)
    if (pagination.pageSize !== currentPagination.pageSize){
      console.log("size change");
      onChangeParams({ limit: currentPagination.pageSize });
    }else if (pagination.current !== currentPagination.current) {
      console.log("page change");
      onChangePage(currentPagination.current);
    } 
    else {
      if (sorter && sorter.field) {
        const ordering = `${
          sortedField.charAt(0) !== '-' && sortedField === sorter.field
            ? '-'
            : ''
        }${sorter.field}`;

        onChangeParams({ ordering });
        return;
      }
      onChangeParams({ ordering: null });
    }
  };

  const [formatedColumns, setFormatedColumns] = useState([]);

  const isColumnSorted = fieldName => {
    /**
     * Checking if column is sorted.
     */
    if (![fieldName, `-${fieldName}`].find(s => s === sortedField))
      return false;

    return sortedField.charAt(0) !== '-' ? 'ascend' : 'descend';
  };

  useEffect(() => {
    /**
     * Formated column, added sortOrder atribute
     */
    setFormatedColumns(
      columns.map(column => {
        column.sortOrder = isColumnSorted(column.dataIndex);
        return column;
      })
    );
  }, [columns]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Table
      columns={formatedColumns}
      rowKey={obj => obj.id}
      dataSource={results}
      pagination={pagination}
      loading={loading}
      onChange={handleTableChange}
      bordered={true}
      {...otherTableParams}
    />
  );
};

export default ObjectsTable;

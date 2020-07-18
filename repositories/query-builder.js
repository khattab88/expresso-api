/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable one-var */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
// eslint-disable-next-line no-unused-vars
class QueryBuilder {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryParams = { ...this.queryString };

    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    let filter = queryParams;

    // 1) basic filtering
    const excluded = ["sort", "fields", "page", "pagesize", "limit",];
    excluded.forEach(field => delete filter[field]);

    // 2) advanced filtering
    let queryStr = JSON.stringify(filter);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
    filter = JSON.parse(queryStr);

    this.query = this.query.find(filter);
    return this;
  }

  sort() {
    const queryParams = { ...this.queryString };
    let sortBy = queryParams.sort;

    if (sortBy) {
      sortBy = sortBy.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      // default sorting
      this.query = this.query.sort("name");
    }

    return this;
  }

  project() {
    const queryParams = { ...this.queryString };
    let fields = queryParams.fields;

    if (fields) {
      fields = fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      const excludedFields = ["-_id", "-__v"].join(" ");
      this.query = this.query.select(excludedFields);
    }

    return this;
  }

  paginate() {
    const queryParams = { ...this.queryString };
    let paging = null;

    if (queryParams.page) {
      paging = {
        page: (queryParams.page * 1) - 1,
        pageSize: queryParams.pagesize * 1
      };
    }

    let page = 0, pageSize = 10, skip = 0;
    if (paging) {
      page = paging.page;
      pageSize = paging.pageSize;
      skip = page * pageSize;

      this.query = this.query.skip(skip).limit(pageSize);
    } else {
      // default paging
      // this.query = this.query.skip(skip).limit(pageSize); //(DISABLED)
    }

    return this;
  }

  limit() {
    const queryParams = { ...this.queryString };
    const limit = queryParams.limit * 1;

    if (limit) {
      this.query = this.query.limit(limit);
    }

    return this;
  }

}

module.exports = QueryBuilder;

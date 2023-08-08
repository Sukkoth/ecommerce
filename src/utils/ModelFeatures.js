class ModelFeatures {
  /**
   *
   * @param {mongooseQuery} query
   * @param {expressRequest} requestObject
   */
  constructor(query, requestObject) {
    this.query = query;
    this.requestObject = requestObject;
  }

  /**
   * @desc Filter results
   * @returns {Self}
   */
  filter() {
    //extract query
    let queryString = { ...this.requestObject.query };

    //remove excluded
    const excludedFields = ['page', 'limit', 'sort', 'fields'];
    excludedFields.forEach((field) => {
      delete queryString[field];
    });

    //replace characters
    queryString = JSON.stringify(queryString);
    queryString = queryString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );
    queryString = JSON.parse(queryString);

    //store the query
    this.query = this.query.find(queryString);

    return this;
  }

  /**
   * @desc Sort results
   * @returns {Self}
   */
  sort() {
    if (this.requestObject.query.sort) {
      let sortQuery = this.requestObject.query.sort;
      sortQuery = sortQuery.split(',').join(' ');
      this.query.sort(sortQuery);
    } else {
      this.query.sort('-createdAt');
    }

    return this;
  }

  /**
   * @desc Select Fields
   * @returns {Self}
   */
  selectFields() {
    if (this.requestObject.query.fields) {
      let fieldsQuery = this.requestObject.query.fields;
      fieldsQuery = fieldsQuery.split(',').join(' ');
      this.query.select(fieldsQuery);
    }
    return this;
  }

  /**
   * @desc Paginate results
   * @param {Number} totalDocuments
   * @returns {Self}
   */
  paginate() {
    const page = Number.parseInt(this.requestObject.query.page) || 1;
    const limit = Number.parseInt(this.requestObject.query.limit) || 100;
    const skipQuery = (page - 1) * limit;

    // if (skipQuery >= totalDocuments) {
    //   throw new Error(`Page ${page} does not exist for the Model record}`);
    // }

    this.query.skip(skipQuery).limit(limit);

    return this;
  }
  /**
   * @desc return the query after executing itF
   * @returns {Self}
   */
  get() {
    return this.query;
  }
}

module.exports = ModelFeatures;

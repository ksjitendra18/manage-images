var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc2) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc(from, key)) || desc2.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// netlify/functions/signup.ts
var signup_exports = {};
__export(signup_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(signup_exports);

// node_modules/nanoid/index.js
var import_crypto = require("crypto");
var POOL_SIZE_MULTIPLIER = 128;
var pool;
var poolOffset;
var fillPool = (bytes2) => {
  if (!pool || pool.length < bytes2) {
    pool = Buffer.allocUnsafe(bytes2 * POOL_SIZE_MULTIPLIER);
    (0, import_crypto.randomFillSync)(pool);
    poolOffset = 0;
  } else if (poolOffset + bytes2 > pool.length) {
    (0, import_crypto.randomFillSync)(pool);
    poolOffset = 0;
  }
  poolOffset += bytes2;
};
var random = (bytes2) => {
  fillPool(bytes2 -= 0);
  return pool.subarray(poolOffset - bytes2, poolOffset);
};
var customRandom = (alphabet, defaultSize, getRandom) => {
  let mask = (2 << 31 - Math.clz32(alphabet.length - 1 | 1)) - 1;
  let step = Math.ceil(1.6 * mask * defaultSize / alphabet.length);
  return (size = defaultSize) => {
    let id = "";
    while (true) {
      let bytes2 = getRandom(step);
      let i = step;
      while (i--) {
        id += alphabet[bytes2[i] & mask] || "";
        if (id.length === size)
          return id;
      }
    }
  };
};
var customAlphabet = (alphabet, size = 21) => customRandom(alphabet, size, random);

// node_modules/drizzle-orm/relations-3eb6fe55.mjs
var Column = class {
  table;
  name;
  primary;
  notNull;
  default;
  hasDefault;
  config;
  constructor(table, config) {
    this.table = table;
    this.config = config;
    this.name = config.name;
    this.notNull = config.notNull;
    this.default = config.default;
    this.hasDefault = config.hasDefault;
    this.primary = config.primaryKey;
  }
  mapFromDriverValue(value) {
    return value;
  }
  mapToDriverValue(value) {
    return value;
  }
};
var ViewBaseConfig = Symbol("ViewBaseConfig");
var View = class {
  [ViewBaseConfig];
  constructor({ name: name2, schema, selectedFields, query }) {
    this[ViewBaseConfig] = {
      name: name2,
      originalName: name2,
      schema,
      selectedFields,
      query,
      isExisting: !query,
      isAlias: false
    };
  }
};
var SubqueryConfig = Symbol("SubqueryConfig");
var Subquery = class {
  [SubqueryConfig];
  constructor(sql2, selection, alias, isWith = false) {
    this[SubqueryConfig] = {
      sql: sql2,
      selection,
      alias,
      isWith
    };
  }
};
var WithSubquery = class extends Subquery {
};
var SelectionProxyHandler = class {
  config;
  constructor(config) {
    this.config = __spreadValues({}, config);
  }
  get(subquery, prop) {
    if (prop === SubqueryConfig) {
      return __spreadProps(__spreadValues({}, subquery[SubqueryConfig]), {
        selection: new Proxy(subquery[SubqueryConfig].selection, this)
      });
    }
    if (prop === ViewBaseConfig) {
      return __spreadProps(__spreadValues({}, subquery[ViewBaseConfig]), {
        selectedFields: new Proxy(subquery[ViewBaseConfig].selectedFields, this)
      });
    }
    if (typeof prop === "symbol") {
      return subquery[prop];
    }
    const columns = subquery instanceof Subquery ? subquery[SubqueryConfig].selection : subquery instanceof View ? subquery[ViewBaseConfig].selectedFields : subquery;
    const value = columns[prop];
    if (value instanceof SQL.Aliased) {
      if (this.config.sqlAliasedBehavior === "sql" && !value.isSelectionField) {
        return value.sql;
      }
      const newValue = value.clone();
      newValue.isSelectionField = true;
      return newValue;
    }
    if (value instanceof SQL) {
      if (this.config.sqlBehavior === "sql") {
        return value;
      }
      throw new Error(`You tried to reference "${prop}" field from a subquery, which is a raw SQL field, but it doesn't have an alias declared. Please add an alias to the field using ".as('alias')" method.`);
    }
    if (value instanceof Column) {
      if (this.config.alias) {
        return new Proxy(value, new ColumnAliasProxyHandler(new Proxy(value.table, new TableAliasProxyHandler(this.config.alias, this.config.replaceOriginalName ?? false))));
      }
      return value;
    }
    if (typeof value !== "object" || value === null) {
      return value;
    }
    return new Proxy(value, new SelectionProxyHandler(this.config));
  }
};
var TableName = Symbol("Name");
var Schema = Symbol("Schema");
var Columns = Symbol("Columns");
var OriginalName = Symbol("OriginalName");
var BaseName = Symbol("BaseName");
var IsAlias = Symbol("IsAlias");
var ExtraConfigBuilder = Symbol("ExtraConfigBuilder");
var IsDrizzleTable = Symbol.for("IsDrizzleTable");
var Table = class {
  [TableName];
  [OriginalName];
  [Schema];
  [Columns];
  [BaseName];
  [IsAlias] = false;
  [ExtraConfigBuilder] = void 0;
  [IsDrizzleTable] = true;
  constructor(name2, schema, baseName) {
    this[TableName] = this[OriginalName] = name2;
    this[Schema] = schema;
    this[BaseName] = baseName;
  }
};
__publicField(Table, "Symbol", {
  Name: TableName,
  Schema,
  OriginalName,
  Columns,
  BaseName,
  IsAlias,
  ExtraConfigBuilder
});
function isTable(table) {
  return typeof table === "object" && table !== null && IsDrizzleTable in table;
}
function getTableName(table) {
  return table[TableName];
}
function mapResultRow(columns, row, joinsNotNullableMap) {
  const nullifyMap = {};
  const result = columns.reduce((result2, { path, field }, columnIndex) => {
    let decoder2;
    if (field instanceof Column) {
      decoder2 = field;
    } else if (field instanceof SQL) {
      decoder2 = field.decoder;
    } else {
      decoder2 = field.sql.decoder;
    }
    let node = result2;
    for (const [pathChunkIndex, pathChunk] of path.entries()) {
      if (pathChunkIndex < path.length - 1) {
        if (!(pathChunk in node)) {
          node[pathChunk] = {};
        }
        node = node[pathChunk];
      } else {
        const rawValue = row[columnIndex];
        const value = node[pathChunk] = rawValue === null ? null : decoder2.mapFromDriverValue(rawValue);
        if (joinsNotNullableMap && field instanceof Column && path.length === 2) {
          const objectName = path[0];
          if (!(objectName in nullifyMap)) {
            nullifyMap[objectName] = value === null ? getTableName(field.table) : false;
          } else if (typeof nullifyMap[objectName] === "string" && nullifyMap[objectName] !== getTableName(field.table)) {
            nullifyMap[objectName] = false;
          }
        }
      }
    }
    return result2;
  }, {});
  if (joinsNotNullableMap && Object.keys(nullifyMap).length > 0) {
    for (const [objectName, tableName] of Object.entries(nullifyMap)) {
      if (typeof tableName === "string" && !joinsNotNullableMap[tableName]) {
        result[objectName] = null;
      }
    }
  }
  return result;
}
function orderSelectedFields(fields, pathPrefix) {
  return Object.entries(fields).reduce((result, [name2, field]) => {
    if (typeof name2 !== "string") {
      return result;
    }
    const newPath = pathPrefix ? [...pathPrefix, name2] : [name2];
    if (field instanceof Column || field instanceof SQL || field instanceof SQL.Aliased) {
      result.push({ path: newPath, field });
    } else if (field instanceof Table) {
      result.push(...orderSelectedFields(field[Table.Symbol.Columns], newPath));
    } else {
      result.push(...orderSelectedFields(field, newPath));
    }
    return result;
  }, []);
}
function mapUpdateSet(table, values) {
  const entries = Object.entries(values).filter(([, value]) => value !== void 0).map(([key, value]) => {
    if (value instanceof SQL) {
      return [key, value];
    } else {
      return [key, new Param(value, table[Table.Symbol.Columns][key])];
    }
  });
  if (entries.length === 0) {
    throw new Error("No values to set");
  }
  return Object.fromEntries(entries);
}
function applyMixins(baseClass, extendedClasses) {
  for (const extendedClass of extendedClasses) {
    for (const name2 of Object.getOwnPropertyNames(extendedClass.prototype)) {
      Object.defineProperty(baseClass.prototype, name2, Object.getOwnPropertyDescriptor(extendedClass.prototype, name2) || /* @__PURE__ */ Object.create(null));
    }
  }
}
function getTableColumns(table) {
  return table[Table.Symbol.Columns];
}
function getTableLikeName(table) {
  return table instanceof Subquery ? table[SubqueryConfig].alias : table instanceof View ? table[ViewBaseConfig].name : table instanceof SQL ? void 0 : table[Table.Symbol.IsAlias] ? table[Table.Symbol.Name] : table[Table.Symbol.BaseName];
}
var tracer = {
  startActiveSpan(name2, fn) {
    {
      return fn();
    }
  }
};
function bindIfParam(value, column) {
  if (isDriverValueEncoder(column) && !isSQLWrapper(value) && !(value instanceof Param) && !(value instanceof Placeholder) && !(value instanceof Column) && !(value instanceof Table) && !(value instanceof View)) {
    return new Param(value, column);
  }
  return value;
}
function eq(left, right) {
  return sql`${left} = ${bindIfParam(right, left)}`;
}
function and(...unfilteredConditions) {
  const conditions = unfilteredConditions.filter((c) => c !== void 0);
  if (conditions.length === 0) {
    return void 0;
  }
  if (conditions.length === 1) {
    return conditions[0];
  }
  const chunks = [sql.raw("(")];
  for (const [index, condition] of conditions.entries()) {
    if (index === 0) {
      chunks.push(condition);
    } else {
      chunks.push(sql` and `, condition);
    }
  }
  chunks.push(sql`)`);
  return sql.fromList(chunks);
}
function or(...unfilteredConditions) {
  const conditions = unfilteredConditions.filter((c) => c !== void 0);
  if (conditions.length === 0) {
    return void 0;
  }
  if (conditions.length === 1) {
    return conditions[0];
  }
  const chunks = [sql.raw("(")];
  for (const [index, condition] of conditions.entries()) {
    if (index === 0) {
      chunks.push(condition);
    } else {
      chunks.push(sql` or `, condition);
    }
  }
  chunks.push(sql`)`);
  return sql.fromList(chunks);
}
function asc(column) {
  return sql`${column} asc`;
}
function desc(column) {
  return sql`${column} desc`;
}
function isSQLWrapper(value) {
  return typeof value === "object" && value !== null && "getSQL" in value && typeof value.getSQL === "function";
}
function mergeQueries(queries) {
  var _a;
  const result = { sql: "", params: [] };
  for (const query of queries) {
    result.sql += query.sql;
    result.params.push(...query.params);
    if ((_a = query.typings) == null ? void 0 : _a.length) {
      result.typings = result.typings || [];
      result.typings.push(...query.typings);
    }
  }
  return result;
}
var StringChunk = class {
  value;
  constructor(value) {
    this.value = Array.isArray(value) ? value : [value];
  }
};
var SQL = class {
  queryChunks;
  decoder = noopDecoder;
  shouldInlineParams = false;
  constructor(queryChunks) {
    this.queryChunks = queryChunks;
  }
  append(query) {
    this.queryChunks.push(...query.queryChunks);
    return this;
  }
  toQuery(config) {
    return tracer.startActiveSpan("drizzle.buildSQL", (span) => {
      const query = this.buildQueryFromSourceParams(this.queryChunks, config);
      span == null ? void 0 : span.setAttributes({
        "drizzle.query.text": query.sql,
        "drizzle.query.params": JSON.stringify(query.params)
      });
      return query;
    });
  }
  buildQueryFromSourceParams(chunks, _config) {
    const config = Object.assign({}, _config, {
      inlineParams: _config.inlineParams || this.shouldInlineParams,
      paramStartIndex: _config.paramStartIndex || { value: 0 }
    });
    const { escapeName, escapeParam, prepareTyping, inlineParams, paramStartIndex } = config;
    return mergeQueries(chunks.map((chunk) => {
      if (chunk instanceof StringChunk) {
        return { sql: chunk.value.join(""), params: [] };
      }
      if (chunk instanceof Name) {
        return { sql: escapeName(chunk.value), params: [] };
      }
      if (chunk === void 0) {
        return { sql: "", params: [] };
      }
      if (Array.isArray(chunk)) {
        const result = [new StringChunk("(")];
        for (const [i, p] of chunk.entries()) {
          result.push(p);
          if (i < chunk.length - 1) {
            result.push(new StringChunk(", "));
          }
        }
        result.push(new StringChunk(")"));
        return this.buildQueryFromSourceParams(result, config);
      }
      if (chunk instanceof SQL) {
        return this.buildQueryFromSourceParams(chunk.queryChunks, __spreadProps(__spreadValues({}, config), {
          inlineParams: inlineParams || chunk.shouldInlineParams
        }));
      }
      if (chunk instanceof Table) {
        const schemaName = chunk[Table.Symbol.Schema];
        const tableName = chunk[Table.Symbol.Name];
        return {
          sql: schemaName === void 0 ? escapeName(tableName) : escapeName(schemaName) + "." + escapeName(tableName),
          params: []
        };
      }
      if (chunk instanceof Column) {
        return { sql: escapeName(chunk.table[Table.Symbol.Name]) + "." + escapeName(chunk.name), params: [] };
      }
      if (chunk instanceof View) {
        const schemaName = chunk[ViewBaseConfig].schema;
        const viewName = chunk[ViewBaseConfig].name;
        return {
          sql: schemaName === void 0 ? escapeName(viewName) : escapeName(schemaName) + "." + escapeName(viewName),
          params: []
        };
      }
      if (chunk instanceof Param) {
        const mappedValue = chunk.value === null ? null : chunk.encoder.mapToDriverValue(chunk.value);
        if (mappedValue instanceof SQL) {
          return this.buildQueryFromSourceParams([mappedValue], config);
        }
        if (inlineParams) {
          return { sql: this.mapInlineParam(mappedValue, config), params: [] };
        }
        let typings;
        if (prepareTyping !== void 0) {
          typings = [prepareTyping(chunk.encoder)];
        }
        return { sql: escapeParam(paramStartIndex.value++, mappedValue), params: [mappedValue], typings };
      }
      if (chunk instanceof SQL.Aliased && chunk.fieldAlias !== void 0) {
        return { sql: escapeName(chunk.fieldAlias), params: [] };
      }
      if (chunk instanceof Subquery) {
        if (chunk[SubqueryConfig].isWith) {
          return { sql: escapeName(chunk[SubqueryConfig].alias), params: [] };
        }
        return this.buildQueryFromSourceParams([
          new StringChunk("("),
          chunk[SubqueryConfig].sql,
          new StringChunk(") "),
          new Name(chunk[SubqueryConfig].alias)
        ], config);
      }
      if (isSQLWrapper(chunk)) {
        return this.buildQueryFromSourceParams([
          new StringChunk("("),
          chunk.getSQL(),
          new StringChunk(")")
        ], config);
      }
      if (chunk instanceof Relation) {
        return this.buildQueryFromSourceParams([
          chunk.sourceTable,
          new StringChunk("."),
          sql.identifier(chunk.fieldName)
        ], config);
      }
      if (inlineParams) {
        return { sql: this.mapInlineParam(chunk, config), params: [] };
      }
      return { sql: escapeParam(paramStartIndex.value++, chunk), params: [chunk] };
    }));
  }
  mapInlineParam(chunk, { escapeString }) {
    if (chunk === null) {
      return "null";
    }
    if (typeof chunk === "number" || typeof chunk === "boolean") {
      return chunk.toString();
    }
    if (typeof chunk === "string") {
      return escapeString(chunk);
    }
    if (typeof chunk === "object") {
      const mappedValueAsString = chunk.toString();
      if (mappedValueAsString === "[object Object]") {
        return escapeString(JSON.stringify(chunk));
      }
      return escapeString(mappedValueAsString);
    }
    throw new Error("Unexpected param value: " + chunk);
  }
  getSQL() {
    return this;
  }
  as(alias) {
    if (alias === void 0) {
      return this;
    }
    return new SQL.Aliased(this, alias);
  }
  mapWith(decoder2) {
    this.decoder = typeof decoder2 === "function" ? { mapFromDriverValue: decoder2 } : decoder2;
    return this;
  }
  inlineParams() {
    this.shouldInlineParams = true;
    return this;
  }
};
var Name = class {
  value;
  brand;
  constructor(value) {
    this.value = value;
  }
};
function name(value) {
  return new Name(value);
}
function isDriverValueEncoder(value) {
  return typeof value === "object" && value !== null && "mapToDriverValue" in value && typeof value.mapToDriverValue === "function";
}
var noopDecoder = {
  mapFromDriverValue: (value) => value
};
var noopEncoder = {
  mapToDriverValue: (value) => value
};
var noopMapper = __spreadValues(__spreadValues({}, noopDecoder), noopEncoder);
var Param = class {
  value;
  encoder;
  brand;
  constructor(value, encoder = noopEncoder) {
    this.value = value;
    this.encoder = encoder;
  }
};
function sql(strings, ...params) {
  const queryChunks = [];
  if (params.length > 0 || strings.length > 0 && strings[0] !== "") {
    queryChunks.push(new StringChunk(strings[0]));
  }
  for (const [paramIndex, param2] of params.entries()) {
    queryChunks.push(param2, new StringChunk(strings[paramIndex + 1]));
  }
  return new SQL(queryChunks);
}
(function(sql2) {
  function empty() {
    return new SQL([]);
  }
  sql2.empty = empty;
  function fromList(list) {
    return new SQL(list);
  }
  sql2.fromList = fromList;
  function raw(str) {
    return new SQL([new StringChunk(str)]);
  }
  sql2.raw = raw;
  function join(chunks, separator) {
    const result = [];
    for (const [i, chunk] of chunks.entries()) {
      if (i > 0) {
        result.push(separator);
      }
      result.push(chunk);
    }
    return sql2.fromList(result);
  }
  sql2.join = join;
  function identifier(value) {
    return name(value);
  }
  sql2.identifier = identifier;
})(sql || (sql = {}));
(function(SQL2) {
  class Aliased {
    sql;
    fieldAlias;
    isSelectionField = false;
    constructor(sql2, fieldAlias) {
      this.sql = sql2;
      this.fieldAlias = fieldAlias;
    }
    getSQL() {
      return this.sql;
    }
    clone() {
      return new Aliased(this.sql, this.fieldAlias);
    }
  }
  SQL2.Aliased = Aliased;
})(SQL || (SQL = {}));
var Placeholder = class {
  name;
  constructor(name2) {
    this.name = name2;
  }
};
function fillPlaceholders(params, values) {
  return params.map((p) => {
    if (p instanceof Placeholder) {
      if (!(p.name in values)) {
        throw new Error(`No value for placeholder "${p.name}" was provided`);
      }
      return values[p.name];
    }
    return p;
  });
}
var ColumnAliasProxyHandler = class {
  table;
  constructor(table) {
    this.table = table;
  }
  get(columnObj, prop) {
    if (prop === "table") {
      return this.table;
    }
    return columnObj[prop];
  }
};
var TableAliasProxyHandler = class {
  alias;
  replaceOriginalName;
  constructor(alias, replaceOriginalName) {
    this.alias = alias;
    this.replaceOriginalName = replaceOriginalName;
  }
  get(target, prop) {
    if (prop === Table.Symbol.IsAlias) {
      return true;
    }
    if (prop === Table.Symbol.Name) {
      return this.alias;
    }
    if (this.replaceOriginalName && prop === Table.Symbol.OriginalName) {
      return this.alias;
    }
    if (prop === ViewBaseConfig) {
      return __spreadProps(__spreadValues({}, target[ViewBaseConfig]), {
        name: this.alias,
        isAlias: true
      });
    }
    if (prop === Table.Symbol.Columns) {
      const columns = target[Table.Symbol.Columns];
      if (!columns) {
        return columns;
      }
      const proxiedColumns = {};
      Object.keys(columns).map((key) => {
        proxiedColumns[key] = new Proxy(columns[key], new ColumnAliasProxyHandler(new Proxy(target, this)));
      });
      return proxiedColumns;
    }
    const value = target[prop];
    if (value instanceof Column) {
      return new Proxy(value, new ColumnAliasProxyHandler(new Proxy(target, this)));
    }
    return value;
  }
};
var RelationTableAliasProxyHandler = class {
  alias;
  constructor(alias) {
    this.alias = alias;
  }
  get(target, prop) {
    if (prop === "sourceTable") {
      return aliasedTable(target.sourceTable, this.alias);
    }
    return target[prop];
  }
};
function aliasedTable(table, tableAlias) {
  return new Proxy(table, new TableAliasProxyHandler(tableAlias, false));
}
function aliasedRelation(relation, tableAlias) {
  return new Proxy(relation, new RelationTableAliasProxyHandler(tableAlias));
}
function aliasedTableColumn(column, tableAlias) {
  return new Proxy(column, new ColumnAliasProxyHandler(new Proxy(column.table, new TableAliasProxyHandler(tableAlias, false))));
}
function mapColumnsInAliasedSQLToAlias(query, alias) {
  return new SQL.Aliased(mapColumnsInSQLToAlias(query.sql, alias), query.fieldAlias);
}
function mapColumnsInSQLToAlias(query, alias) {
  return sql.fromList(query.queryChunks.map((c) => {
    if (c instanceof Column) {
      return aliasedTableColumn(c, alias);
    }
    if (c instanceof SQL) {
      return mapColumnsInSQLToAlias(c, alias);
    }
    if (c instanceof SQL.Aliased) {
      return mapColumnsInAliasedSQLToAlias(c, alias);
    }
    return c;
  }));
}
var ColumnBuilder = class {
  config;
  constructor(name2) {
    this.config = {
      name: name2,
      notNull: false,
      default: void 0,
      primaryKey: false
    };
  }
  $type() {
    return this;
  }
  notNull() {
    this.config.notNull = true;
    return this;
  }
  default(value) {
    this.config.default = value;
    this.config.hasDefault = true;
    return this;
  }
  primaryKey() {
    this.config.primaryKey = true;
    this.config.notNull = true;
    return this;
  }
};
var QueryPromise = class {
  [Symbol.toStringTag] = "QueryPromise";
  catch(onRejected) {
    return this.then(void 0, onRejected);
  }
  finally(onFinally) {
    return this.then((value) => {
      onFinally == null ? void 0 : onFinally();
      return value;
    }, (reason) => {
      onFinally == null ? void 0 : onFinally();
      throw reason;
    });
  }
  then(onFulfilled, onRejected) {
    return this.execute().then(onFulfilled, onRejected);
  }
};
var InlineForeignKeys = Symbol("InlineForeignKeys");
var PgTable = class extends Table {
  [InlineForeignKeys] = [];
  [Table.Symbol.ExtraConfigBuilder] = void 0;
};
__publicField(PgTable, "Symbol", Object.assign({}, Table.Symbol, {
  InlineForeignKeys
}));
var PrimaryKeyBuilder = class {
  columns;
  constructor(columns) {
    this.columns = columns;
  }
  build(table) {
    return new PrimaryKey(table, this.columns);
  }
};
var PrimaryKey = class {
  table;
  columns;
  constructor(table, columns) {
    this.table = table;
    this.columns = columns;
  }
  getName() {
    return `${this.table[PgTable.Symbol.Name]}_${this.columns.map((column) => column.name).join("_")}_pk`;
  }
};
var TypedQueryBuilder = class {
  getSelectedFields() {
    return this._.selectedFields;
  }
};
var PgSelectQueryBuilder = class extends TypedQueryBuilder {
  isPartialSelect;
  session;
  dialect;
  _;
  config;
  joinsNotNullableMap;
  tableName;
  constructor(table, fields, isPartialSelect, session, dialect, withList) {
    super();
    this.isPartialSelect = isPartialSelect;
    this.session = session;
    this.dialect = dialect;
    this.config = {
      withList,
      table,
      fields: __spreadValues({}, fields),
      joins: [],
      orderBy: [],
      groupBy: [],
      lockingClauses: []
    };
    this._ = {
      selectedFields: fields
    };
    this.tableName = getTableLikeName(table);
    this.joinsNotNullableMap = typeof this.tableName === "string" ? { [this.tableName]: true } : {};
  }
  createJoin(joinType) {
    return (table, on) => {
      const baseTableName = this.tableName;
      const tableName = getTableLikeName(table);
      if (typeof tableName === "string" && this.config.joins.some((join) => join.alias === tableName)) {
        throw new Error(`Alias "${tableName}" is already used in this query`);
      }
      if (!this.isPartialSelect) {
        if (Object.keys(this.joinsNotNullableMap).length === 1 && typeof baseTableName === "string") {
          this.config.fields = {
            [baseTableName]: this.config.fields
          };
        }
        if (typeof tableName === "string" && !(table instanceof SQL)) {
          const selection = table instanceof Subquery ? table[SubqueryConfig].selection : table instanceof View ? table[ViewBaseConfig].selectedFields : table[Table.Symbol.Columns];
          this.config.fields[tableName] = selection;
        }
      }
      if (typeof on === "function") {
        on = on(new Proxy(this.config.fields, new SelectionProxyHandler({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })));
      }
      this.config.joins.push({ on, table, joinType, alias: tableName });
      if (typeof tableName === "string") {
        switch (joinType) {
          case "left": {
            this.joinsNotNullableMap[tableName] = false;
            break;
          }
          case "right": {
            this.joinsNotNullableMap = Object.fromEntries(Object.entries(this.joinsNotNullableMap).map(([key]) => [key, false]));
            this.joinsNotNullableMap[tableName] = true;
            break;
          }
          case "inner": {
            this.joinsNotNullableMap[tableName] = true;
            break;
          }
          case "full": {
            this.joinsNotNullableMap = Object.fromEntries(Object.entries(this.joinsNotNullableMap).map(([key]) => [key, false]));
            this.joinsNotNullableMap[tableName] = false;
            break;
          }
        }
      }
      return this;
    };
  }
  leftJoin = this.createJoin("left");
  rightJoin = this.createJoin("right");
  innerJoin = this.createJoin("inner");
  fullJoin = this.createJoin("full");
  where(where) {
    if (typeof where === "function") {
      where = where(new Proxy(this.config.fields, new SelectionProxyHandler({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })));
    }
    this.config.where = where;
    return this;
  }
  having(having) {
    if (typeof having === "function") {
      having = having(new Proxy(this.config.fields, new SelectionProxyHandler({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })));
    }
    this.config.having = having;
    return this;
  }
  groupBy(...columns) {
    if (typeof columns[0] === "function") {
      const groupBy = columns[0](new Proxy(this.config.fields, new SelectionProxyHandler({ sqlAliasedBehavior: "alias", sqlBehavior: "sql" })));
      this.config.groupBy = Array.isArray(groupBy) ? groupBy : [groupBy];
    } else {
      this.config.groupBy = columns;
    }
    return this;
  }
  orderBy(...columns) {
    if (typeof columns[0] === "function") {
      const orderBy = columns[0](new Proxy(this.config.fields, new SelectionProxyHandler({ sqlAliasedBehavior: "alias", sqlBehavior: "sql" })));
      this.config.orderBy = Array.isArray(orderBy) ? orderBy : [orderBy];
    } else {
      this.config.orderBy = columns;
    }
    return this;
  }
  limit(limit) {
    this.config.limit = limit;
    return this;
  }
  offset(offset) {
    this.config.offset = offset;
    return this;
  }
  for(strength, config = {}) {
    this.config.lockingClauses.push({ strength, config });
    return this;
  }
  getSQL() {
    return this.dialect.buildSelectQuery(this.config);
  }
  toSQL() {
    const _a = this.dialect.sqlToQuery(this.getSQL()), { typings: _typings } = _a, rest = __objRest(_a, ["typings"]);
    return rest;
  }
  as(alias) {
    return new Proxy(new Subquery(this.getSQL(), this.config.fields, alias), new SelectionProxyHandler({ alias, sqlAliasedBehavior: "alias", sqlBehavior: "error" }));
  }
};
var PgSelect = class extends PgSelectQueryBuilder {
  _prepare(name2) {
    const { session, config, dialect, joinsNotNullableMap } = this;
    if (!session) {
      throw new Error("Cannot execute a query on a query builder. Please use a database instance instead.");
    }
    return tracer.startActiveSpan("drizzle.prepareQuery", () => {
      const fieldsList = orderSelectedFields(config.fields);
      const query = session.prepareQuery(dialect.sqlToQuery(this.getSQL()), fieldsList, name2);
      query.joinsNotNullableMap = joinsNotNullableMap;
      return query;
    });
  }
  prepare(name2) {
    return this._prepare(name2);
  }
  execute = (placeholderValues) => {
    return tracer.startActiveSpan("drizzle.operation", () => {
      return this._prepare().execute(placeholderValues);
    });
  };
};
applyMixins(PgSelect, [QueryPromise]);
var PgViewBase = class extends View {
};
var PgViewConfig = Symbol("PgViewConfig");
var PgView = class extends PgViewBase {
  [PgViewConfig];
  constructor({ pgConfig, config }) {
    super(config);
    if (pgConfig) {
      this[PgViewConfig] = {
        with: pgConfig.with
      };
    }
  }
};
var PgMaterializedViewConfig = Symbol("PgMaterializedViewConfig");
var PgMaterializedView = class extends PgViewBase {
  [PgMaterializedViewConfig];
  constructor({ pgConfig, config }) {
    super(config);
    this[PgMaterializedViewConfig] = {
      with: pgConfig == null ? void 0 : pgConfig.with,
      using: pgConfig == null ? void 0 : pgConfig.using,
      tablespace: pgConfig == null ? void 0 : pgConfig.tablespace,
      withNoData: pgConfig == null ? void 0 : pgConfig.withNoData
    };
  }
};
var Relation = class {
  sourceTable;
  referencedTable;
  relationName;
  referencedTableName;
  fieldName;
  constructor(sourceTable, referencedTable, relationName) {
    this.sourceTable = sourceTable;
    this.referencedTable = referencedTable;
    this.relationName = relationName;
    this.referencedTableName = referencedTable[Table.Symbol.Name];
  }
};
var Relations = class {
  table;
  config;
  constructor(table, config) {
    this.table = table;
    this.config = config;
  }
};
var One = class extends Relation {
  config;
  isNullable;
  constructor(sourceTable, referencedTable, config, isNullable) {
    super(sourceTable, referencedTable, config == null ? void 0 : config.relationName);
    this.config = config;
    this.isNullable = isNullable;
  }
  withFieldName(fieldName) {
    const relation = new One(this.sourceTable, this.referencedTable, this.config, this.isNullable);
    relation.fieldName = fieldName;
    return relation;
  }
};
var Many = class extends Relation {
  config;
  constructor(sourceTable, referencedTable, config) {
    super(sourceTable, referencedTable, config == null ? void 0 : config.relationName);
    this.config = config;
  }
  withFieldName(fieldName) {
    const relation = new Many(this.sourceTable, this.referencedTable, this.config);
    relation.fieldName = fieldName;
    return relation;
  }
};
var operators = {
  sql,
  eq,
  and,
  or
};
var orderByOperators = {
  sql,
  asc,
  desc
};
function extractTablesRelationalConfig(schema, configHelpers) {
  var _a;
  if (Object.keys(schema).length === 1 && "default" in schema && !(schema["default"] instanceof Table)) {
    schema = schema["default"];
  }
  const tableNamesMap = {};
  const relationsBuffer = {};
  const tablesConfig = {};
  for (const [key, value] of Object.entries(schema)) {
    if (isTable(value)) {
      const dbName = value[Table.Symbol.Name];
      const bufferedRelations = relationsBuffer[dbName];
      tableNamesMap[dbName] = key;
      tablesConfig[key] = {
        tsName: key,
        dbName: value[Table.Symbol.Name],
        columns: value[Table.Symbol.Columns],
        relations: (bufferedRelations == null ? void 0 : bufferedRelations.relations) ?? {},
        primaryKey: (bufferedRelations == null ? void 0 : bufferedRelations.primaryKey) ?? []
      };
      for (const column of Object.values(value[Table.Symbol.Columns])) {
        if (column.primary) {
          tablesConfig[key].primaryKey.push(column);
        }
      }
      const extraConfig = (_a = value[Table.Symbol.ExtraConfigBuilder]) == null ? void 0 : _a.call(value, value);
      if (extraConfig) {
        for (const configEntry of Object.values(extraConfig)) {
          if (configEntry instanceof PrimaryKeyBuilder) {
            tablesConfig[key].primaryKey.push(...configEntry.columns);
          }
        }
      }
    } else if (value instanceof Relations) {
      const dbName = value.table[Table.Symbol.Name];
      const tableName = tableNamesMap[dbName];
      const relations2 = value.config(configHelpers(value.table));
      let primaryKey;
      for (const [relationName, relation] of Object.entries(relations2)) {
        if (tableName) {
          const tableConfig = tablesConfig[tableName];
          tableConfig.relations[relationName] = relation;
        } else {
          if (!(dbName in relationsBuffer)) {
            relationsBuffer[dbName] = {
              relations: {},
              primaryKey
            };
          }
          relationsBuffer[dbName].relations[relationName] = relation;
        }
      }
    }
  }
  return { tables: tablesConfig, tableNamesMap };
}
function createOne(sourceTable) {
  return function one(table, config) {
    return new One(sourceTable, table, config, (config == null ? void 0 : config.fields.reduce((res, f) => res && f.notNull, true)) ?? false);
  };
}
function createMany(sourceTable) {
  return function many(referencedTable, config) {
    return new Many(sourceTable, referencedTable, config);
  };
}
function normalizeRelation(schema, tableNamesMap, relation) {
  if (relation instanceof One && relation.config) {
    return {
      fields: relation.config.fields,
      references: relation.config.references
    };
  }
  const referencedTableTsName = tableNamesMap[relation.referencedTable[Table.Symbol.Name]];
  if (!referencedTableTsName) {
    throw new Error(`Table "${relation.referencedTable[Table.Symbol.Name]}" not found in schema`);
  }
  const referencedTableFields = schema[referencedTableTsName];
  if (!referencedTableFields) {
    throw new Error(`Table "${referencedTableTsName}" not found in schema`);
  }
  const sourceTable = relation.sourceTable;
  const sourceTableTsName = tableNamesMap[sourceTable[Table.Symbol.Name]];
  if (!sourceTableTsName) {
    throw new Error(`Table "${sourceTable[Table.Symbol.Name]}" not found in schema`);
  }
  const reverseRelations = [];
  for (const referencedTableRelation of Object.values(referencedTableFields.relations)) {
    if (relation.relationName && relation !== referencedTableRelation && referencedTableRelation.relationName === relation.relationName || !relation.relationName && referencedTableRelation.referencedTable === relation.sourceTable) {
      reverseRelations.push(referencedTableRelation);
    }
  }
  if (reverseRelations.length > 1) {
    throw relation.relationName ? new Error(`There are multiple relations with name "${relation.relationName}" in table "${referencedTableTsName}"`) : new Error(`There are multiple relations between "${referencedTableTsName}" and "${relation.sourceTable[Table.Symbol.Name]}". Please specify relation name`);
  }
  if (reverseRelations[0] && reverseRelations[0] instanceof One && reverseRelations[0].config) {
    return {
      fields: reverseRelations[0].config.references,
      references: reverseRelations[0].config.fields
    };
  }
  throw new Error(`There is not enough information to infer relation "${sourceTableTsName}.${relation.fieldName}"`);
}
function createTableRelationsHelpers(sourceTable) {
  return {
    one: createOne(sourceTable),
    many: createMany(sourceTable)
  };
}
function mapRelationalRow(tablesConfig, tableConfig, row, buildQueryResultSelection, mapColumnValue = (value) => value) {
  const result = {};
  for (const [selectionItemIndex, selectionItem] of buildQueryResultSelection.entries()) {
    if (selectionItem.isJson) {
      const relation = tableConfig.relations[selectionItem.tsKey];
      const rawSubRows = row[selectionItemIndex];
      const subRows = typeof rawSubRows === "string" ? JSON.parse(rawSubRows) : rawSubRows;
      if (relation instanceof One) {
        result[selectionItem.tsKey] = subRows[0] ? mapRelationalRow(tablesConfig, tablesConfig[selectionItem.tableTsKey], subRows[0], selectionItem.selection, mapColumnValue) : null;
      } else {
        result[selectionItem.tsKey] = subRows.map((subRow) => mapRelationalRow(tablesConfig, tablesConfig[selectionItem.tableTsKey], subRow, selectionItem.selection, mapColumnValue));
      }
    } else {
      const value = mapColumnValue(row[selectionItemIndex]);
      const field = selectionItem.field;
      let decoder2;
      if (field instanceof Column) {
        decoder2 = field;
      } else if (field instanceof SQL) {
        decoder2 = field.decoder;
      } else {
        decoder2 = field.sql.decoder;
      }
      result[selectionItem.tsKey] = value === null ? null : decoder2.mapFromDriverValue(value);
    }
  }
  return result;
}

// node_modules/drizzle-orm/errors-bb636d84.mjs
var DrizzleError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "DrizzleError";
  }
  static wrap(error, message) {
    return error instanceof Error ? new DrizzleError(message ? `${message}: ${error.message}` : error.message) : new DrizzleError(message ?? String(error));
  }
};
var TransactionRollbackError = class extends DrizzleError {
  constructor() {
    super("Rollback");
  }
};

// node_modules/drizzle-orm/index.mjs
var ConsoleLogWriter = class {
  write(message) {
    console.log(message);
  }
};
var DefaultLogger = class {
  writer;
  constructor(config) {
    this.writer = (config == null ? void 0 : config.writer) ?? new ConsoleLogWriter();
  }
  logQuery(query, params) {
    const stringifiedParams = params.map((p) => {
      try {
        return JSON.stringify(p);
      } catch {
        return String(p);
      }
    });
    const paramsStr = stringifiedParams.length ? ` -- params: [${stringifiedParams.join(", ")}]` : "";
    this.writer.write(`Query: ${query}${paramsStr}`);
  }
};
var NoopLogger = class {
  logQuery() {
  }
};

// netlify/functions/signup.ts
var import_bcrypt = __toESM(require("bcrypt"));

// node_modules/drizzle-orm/session-2b625be5.mjs
var InlineForeignKeys2 = Symbol("InlineForeignKeys");
var MySqlTable = class extends Table {
  [Table.Symbol.Columns];
  [InlineForeignKeys2] = [];
  [Table.Symbol.ExtraConfigBuilder] = void 0;
};
__publicField(MySqlTable, "Symbol", Object.assign({}, Table.Symbol, {
  InlineForeignKeys: InlineForeignKeys2
}));
function mysqlTableWithSchema(name2, columns, extraConfig, schema, baseName = name2) {
  const rawTable = new MySqlTable(name2, schema, baseName);
  const builtColumns = Object.fromEntries(Object.entries(columns).map(([name3, colBuilder]) => {
    const column = colBuilder.build(rawTable);
    rawTable[InlineForeignKeys2].push(...colBuilder.buildForeignKeys(column, rawTable));
    return [name3, column];
  }));
  const table = Object.assign(rawTable, builtColumns);
  table[Table.Symbol.Columns] = builtColumns;
  if (extraConfig) {
    table[MySqlTable.Symbol.ExtraConfigBuilder] = extraConfig;
  }
  return table;
}
var mysqlTable = (name2, columns, extraConfig) => {
  return mysqlTableWithSchema(name2, columns, extraConfig, void 0, name2);
};
var ForeignKeyBuilder = class {
  reference;
  _onUpdate;
  _onDelete;
  constructor(config, actions) {
    this.reference = () => {
      const { columns, foreignColumns } = config();
      return { columns, foreignTable: foreignColumns[0].table, foreignColumns };
    };
    if (actions) {
      this._onUpdate = actions.onUpdate;
      this._onDelete = actions.onDelete;
    }
  }
  onUpdate(action) {
    this._onUpdate = action;
    return this;
  }
  onDelete(action) {
    this._onDelete = action;
    return this;
  }
  build(table) {
    return new ForeignKey(table, this);
  }
};
var ForeignKey = class {
  table;
  reference;
  onUpdate;
  onDelete;
  constructor(table, builder) {
    this.table = table;
    this.reference = builder.reference;
    this.onUpdate = builder._onUpdate;
    this.onDelete = builder._onDelete;
  }
  getName() {
    const { columns, foreignColumns } = this.reference();
    const columnNames = columns.map((column) => column.name);
    const foreignColumnNames = foreignColumns.map((column) => column.name);
    const chunks = [
      this.table[MySqlTable.Symbol.Name],
      ...columnNames,
      foreignColumns[0].table[MySqlTable.Symbol.Name],
      ...foreignColumnNames
    ];
    return `${chunks.join("_")}_fk`;
  }
};
var MySqlColumnBuilder = class extends ColumnBuilder {
  foreignKeyConfigs = [];
  references(ref, actions = {}) {
    this.foreignKeyConfigs.push({ ref, actions });
    return this;
  }
  buildForeignKeys(column, table) {
    return this.foreignKeyConfigs.map(({ ref, actions }) => {
      return ((ref2, actions2) => {
        const builder = new ForeignKeyBuilder(() => {
          const foreignColumn = ref2();
          return { columns: [column], foreignColumns: [foreignColumn] };
        });
        if (actions2.onUpdate) {
          builder.onUpdate(actions2.onUpdate);
        }
        if (actions2.onDelete) {
          builder.onDelete(actions2.onDelete);
        }
        return builder.build(table);
      })(ref, actions);
    });
  }
};
var MySqlColumn = class extends Column {
};
var MySqlColumnBuilderWithAutoIncrement = class extends MySqlColumnBuilder {
  constructor(name2) {
    super(name2);
    this.config.autoIncrement = false;
  }
  autoincrement() {
    this.config.autoIncrement = true;
    this.config.hasDefault = true;
    return this;
  }
};
var MySqlColumnWithAutoIncrement = class extends MySqlColumn {
  autoIncrement = this.config.autoIncrement;
};
var MySqlDelete = class extends QueryPromise {
  table;
  session;
  dialect;
  config;
  constructor(table, session, dialect) {
    super();
    this.table = table;
    this.session = session;
    this.dialect = dialect;
    this.config = { table };
  }
  where(where) {
    this.config.where = where;
    return this;
  }
  getSQL() {
    return this.dialect.buildDeleteQuery(this.config);
  }
  toSQL() {
    const _a = this.dialect.sqlToQuery(this.getSQL()), { typings: _typings } = _a, rest = __objRest(_a, ["typings"]);
    return rest;
  }
  prepare() {
    return this.session.prepareQuery(this.dialect.sqlToQuery(this.getSQL()), this.config.returning);
  }
  execute = (placeholderValues) => {
    return this.prepare().execute(placeholderValues);
  };
  createIterator = () => {
    const self = this;
    return async function* (placeholderValues) {
      yield* self.prepare().iterator(placeholderValues);
    };
  };
  iterator = this.createIterator();
};
var MySqlInsertBuilder = class {
  table;
  session;
  dialect;
  shouldIgnore = false;
  constructor(table, session, dialect) {
    this.table = table;
    this.session = session;
    this.dialect = dialect;
  }
  ignore() {
    this.shouldIgnore = true;
    return this;
  }
  values(values) {
    values = Array.isArray(values) ? values : [values];
    if (values.length === 0) {
      throw new Error("values() must be called with at least one value");
    }
    const mappedValues = values.map((entry) => {
      const result = {};
      const cols = this.table[Table.Symbol.Columns];
      for (const colKey of Object.keys(entry)) {
        const colValue = entry[colKey];
        result[colKey] = colValue instanceof SQL ? colValue : new Param(colValue, cols[colKey]);
      }
      return result;
    });
    return new MySqlInsert(this.table, mappedValues, this.shouldIgnore, this.session, this.dialect);
  }
};
var MySqlInsert = class extends QueryPromise {
  session;
  dialect;
  config;
  constructor(table, values, ignore, session, dialect) {
    super();
    this.session = session;
    this.dialect = dialect;
    this.config = { table, values, ignore };
  }
  onDuplicateKeyUpdate(config) {
    const setSql = this.dialect.buildUpdateSet(this.config.table, mapUpdateSet(this.config.table, config.set));
    this.config.onConflict = sql`update ${setSql}`;
    return this;
  }
  getSQL() {
    return this.dialect.buildInsertQuery(this.config);
  }
  toSQL() {
    const _a = this.dialect.sqlToQuery(this.getSQL()), { typings: _typings } = _a, rest = __objRest(_a, ["typings"]);
    return rest;
  }
  prepare() {
    return this.session.prepareQuery(this.dialect.sqlToQuery(this.getSQL()), void 0);
  }
  execute = (placeholderValues) => {
    return this.prepare().execute(placeholderValues);
  };
  createIterator = () => {
    const self = this;
    return async function* (placeholderValues) {
      yield* self.prepare().iterator(placeholderValues);
    };
  };
  iterator = this.createIterator();
};
var MySqlViewBase = class extends View {
};
var MySqlViewConfig = Symbol("MySqlViewConfig");
var MySqlView = class extends MySqlViewBase {
  [MySqlViewConfig];
  constructor({ mysqlConfig, config }) {
    super(config);
    this[MySqlViewConfig] = mysqlConfig;
  }
};
var MySqlDialect = class {
  async migrate(migrations, session, config) {
    const migrationsTable = config.migrationsTable ?? "__drizzle_migrations";
    const migrationTableCreate = sql`
			create table if not exists ${name(migrationsTable)} (
				id serial primary key,
				hash text not null,
				created_at bigint
			)
		`;
    await session.execute(migrationTableCreate);
    const dbMigrations = await session.all(sql`select id, hash, created_at from ${name(migrationsTable)} order by created_at desc limit 1`);
    const lastDbMigration = dbMigrations[0];
    await session.transaction(async (tx) => {
      for (const migration of migrations) {
        if (!lastDbMigration || Number(lastDbMigration.created_at) < migration.folderMillis) {
          for (const stmt of migration.sql) {
            await tx.execute(sql.raw(stmt));
          }
          await tx.execute(sql`insert into ${name(migrationsTable)} (\`hash\`, \`created_at\`) values(${migration.hash}, ${migration.folderMillis})`);
        }
      }
    });
  }
  escapeName(name2) {
    return `\`${name2}\``;
  }
  escapeParam(_num) {
    return `?`;
  }
  escapeString(str) {
    return `'${str.replace(/'/g, "''")}'`;
  }
  buildDeleteQuery({ table, where, returning }) {
    const returningSql = returning ? sql` returning ${this.buildSelection(returning, { isSingleTable: true })}` : void 0;
    const whereSql = where ? sql` where ${where}` : void 0;
    return sql`delete from ${table}${whereSql}${returningSql}`;
  }
  buildUpdateSet(table, set) {
    const setEntries = Object.entries(set);
    const setSize = setEntries.length;
    return sql.fromList(setEntries.flatMap(([colName, value], i) => {
      const col = table[Table.Symbol.Columns][colName];
      const res = sql`${name(col.name)} = ${value}`;
      if (i < setSize - 1) {
        return [res, sql.raw(", ")];
      }
      return [res];
    }));
  }
  buildUpdateQuery({ table, set, where, returning }) {
    const setSql = this.buildUpdateSet(table, set);
    const returningSql = returning ? sql` returning ${this.buildSelection(returning, { isSingleTable: true })}` : void 0;
    const whereSql = where ? sql` where ${where}` : void 0;
    return sql`update ${table} set ${setSql}${whereSql}${returningSql}`;
  }
  buildSelection(fields, { isSingleTable = false } = {}) {
    const columnsLen = fields.length;
    const chunks = fields.flatMap(({ field }, i) => {
      const chunk = [];
      if (field instanceof SQL.Aliased && field.isSelectionField) {
        chunk.push(name(field.fieldAlias));
      } else if (field instanceof SQL.Aliased || field instanceof SQL) {
        const query = field instanceof SQL.Aliased ? field.sql : field;
        if (isSingleTable) {
          chunk.push(new SQL(query.queryChunks.map((c) => {
            if (c instanceof MySqlColumn) {
              return name(c.name);
            }
            return c;
          })));
        } else {
          chunk.push(query);
        }
        if (field instanceof SQL.Aliased) {
          chunk.push(sql` as ${name(field.fieldAlias)}`);
        }
      } else if (field instanceof Column) {
        if (isSingleTable) {
          chunk.push(name(field.name));
        } else {
          chunk.push(field);
        }
      }
      if (i < columnsLen - 1) {
        chunk.push(sql`, `);
      }
      return chunk;
    });
    return sql.fromList(chunks);
  }
  buildSelectQuery({ withList, fields, fieldsFlat, where, having, table, joins, orderBy, groupBy, limit, offset, lockingClause }) {
    const fieldsList = fieldsFlat ?? orderSelectedFields(fields);
    for (const f of fieldsList) {
      if (f.field instanceof Column && getTableName(f.field.table) !== (table instanceof Subquery ? table[SubqueryConfig].alias : table instanceof MySqlViewBase ? table[ViewBaseConfig].name : table instanceof SQL ? void 0 : getTableName(table)) && !((table2) => joins.some(({ alias }) => alias === (table2[Table.Symbol.IsAlias] ? getTableName(table2) : table2[Table.Symbol.BaseName])))(f.field.table)) {
        const tableName = getTableName(f.field.table);
        throw new Error(`Your "${f.path.join("->")}" field references a column "${tableName}"."${f.field.name}", but the table "${tableName}" is not part of the query! Did you forget to join it?`);
      }
    }
    const isSingleTable = joins.length === 0;
    let withSql;
    if (withList.length) {
      const withSqlChunks = [sql`with `];
      for (const [i, w] of withList.entries()) {
        withSqlChunks.push(sql`${name(w[SubqueryConfig].alias)} as (${w[SubqueryConfig].sql})`);
        if (i < withList.length - 1) {
          withSqlChunks.push(sql`, `);
        }
      }
      withSqlChunks.push(sql` `);
      withSql = sql.fromList(withSqlChunks);
    }
    const selection = this.buildSelection(fieldsList, { isSingleTable });
    const tableSql = (() => {
      if (table instanceof Table && table[Table.Symbol.OriginalName] !== table[Table.Symbol.Name]) {
        return sql`${name(table[Table.Symbol.OriginalName])} ${name(table[Table.Symbol.Name])}`;
      }
      return table;
    })();
    const joinsArray = [];
    for (const [index, joinMeta] of joins.entries()) {
      if (index === 0) {
        joinsArray.push(sql` `);
      }
      const table2 = joinMeta.table;
      if (table2 instanceof MySqlTable) {
        const tableName = table2[MySqlTable.Symbol.Name];
        const tableSchema = table2[MySqlTable.Symbol.Schema];
        const origTableName = table2[MySqlTable.Symbol.OriginalName];
        const alias = tableName === origTableName ? void 0 : joinMeta.alias;
        joinsArray.push(sql`${sql.raw(joinMeta.joinType)} join ${tableSchema ? sql`${name(tableSchema)}.` : void 0}${name(origTableName)}${alias && sql` ${name(alias)}`} on ${joinMeta.on}`);
      } else if (table2 instanceof View) {
        const viewName = table2[ViewBaseConfig].name;
        const viewSchema = table2[ViewBaseConfig].schema;
        const origViewName = table2[ViewBaseConfig].originalName;
        const alias = viewName === origViewName ? void 0 : joinMeta.alias;
        joinsArray.push(sql`${sql.raw(joinMeta.joinType)} join ${viewSchema ? sql`${name(viewSchema)}.` : void 0}${name(origViewName)}${alias && sql` ${name(alias)}`} on ${joinMeta.on}`);
      } else {
        joinsArray.push(sql`${sql.raw(joinMeta.joinType)} join ${table2} on ${joinMeta.on}`);
      }
      if (index < joins.length - 1) {
        joinsArray.push(sql` `);
      }
    }
    const joinsSql = sql.fromList(joinsArray);
    const whereSql = where ? sql` where ${where}` : void 0;
    const havingSql = having ? sql` having ${having}` : void 0;
    const orderByList = [];
    for (const [index, orderByValue] of orderBy.entries()) {
      orderByList.push(orderByValue);
      if (index < orderBy.length - 1) {
        orderByList.push(sql`, `);
      }
    }
    const orderBySql = orderByList.length > 0 ? sql` order by ${sql.fromList(orderByList)}` : void 0;
    const groupByList = [];
    for (const [index, groupByValue] of groupBy.entries()) {
      groupByList.push(groupByValue);
      if (index < groupBy.length - 1) {
        groupByList.push(sql`, `);
      }
    }
    const groupBySql = groupByList.length > 0 ? sql` group by ${sql.fromList(groupByList)}` : void 0;
    const limitSql = limit ? sql` limit ${limit}` : void 0;
    const offsetSql = offset ? sql` offset ${offset}` : void 0;
    let lockingClausesSql;
    if (lockingClause) {
      const { config, strength } = lockingClause;
      lockingClausesSql = sql` for ${sql.raw(strength)}`;
      if (config.noWait) {
        lockingClausesSql.append(sql` no wait`);
      } else if (config.skipLocked) {
        lockingClausesSql.append(sql` skip locked`);
      }
    }
    return sql`${withSql}select ${selection} from ${tableSql}${joinsSql}${whereSql}${groupBySql}${havingSql}${orderBySql}${limitSql}${offsetSql}${lockingClausesSql}`;
  }
  buildInsertQuery({ table, values, ignore, onConflict }) {
    const isSingleValue = values.length === 1;
    const valuesSqlList = [];
    const columns = table[Table.Symbol.Columns];
    const colEntries = isSingleValue ? Object.keys(values[0]).map((fieldName) => [fieldName, columns[fieldName]]) : Object.entries(columns);
    const insertOrder = colEntries.map(([, column]) => name(column.name));
    for (const [valueIndex, value] of values.entries()) {
      const valueList = [];
      for (const [fieldName] of colEntries) {
        const colValue = value[fieldName];
        if (colValue === void 0 || colValue instanceof Param && colValue.value === void 0) {
          valueList.push(sql`default`);
        } else {
          valueList.push(colValue);
        }
      }
      valuesSqlList.push(valueList);
      if (valueIndex < values.length - 1) {
        valuesSqlList.push(sql`, `);
      }
    }
    const valuesSql = sql.fromList(valuesSqlList);
    const ignoreSql = ignore ? sql` ignore` : void 0;
    const onConflictSql = onConflict ? sql` on duplicate key ${onConflict}` : void 0;
    return sql`insert${ignoreSql} into ${table} ${insertOrder} values ${valuesSql}${onConflictSql}`;
  }
  sqlToQuery(sql2) {
    return sql2.toQuery({
      escapeName: this.escapeName,
      escapeParam: this.escapeParam,
      escapeString: this.escapeString
    });
  }
  buildRelationalQuery(fullSchema, schema, tableNamesMap, table, tableConfig, config, tableAlias, relationColumns, isRoot = false) {
    if (config === true) {
      const selectionEntries = Object.entries(tableConfig.columns);
      const selection = selectionEntries.map(([key, value]) => ({
        dbKey: value.name,
        tsKey: key,
        field: value,
        tableTsKey: void 0,
        isJson: false,
        selection: []
      }));
      return {
        tableTsKey: tableConfig.tsName,
        sql: table,
        selection
      };
    }
    const aliasedColumns = Object.fromEntries(Object.entries(tableConfig.columns).map(([key, value]) => [key, aliasedTableColumn(value, tableAlias)]));
    const aliasedRelations = Object.fromEntries(Object.entries(tableConfig.relations).map(([key, value]) => [key, aliasedRelation(value, tableAlias)]));
    const aliasedFields = Object.assign({}, aliasedColumns, aliasedRelations);
    const fieldsSelection = {};
    let selectedColumns = [];
    let selectedExtras = [];
    let selectedRelations = [];
    if (config.columns) {
      let isIncludeMode = false;
      for (const [field, value] of Object.entries(config.columns)) {
        if (value === void 0) {
          continue;
        }
        if (field in tableConfig.columns) {
          if (!isIncludeMode && value === true) {
            isIncludeMode = true;
          }
          selectedColumns.push(field);
        }
      }
      if (selectedColumns.length > 0) {
        selectedColumns = isIncludeMode ? selectedColumns.filter((c) => {
          var _a;
          return ((_a = config.columns) == null ? void 0 : _a[c]) === true;
        }) : Object.keys(tableConfig.columns).filter((key) => !selectedColumns.includes(key));
      }
    }
    if (config.with) {
      selectedRelations = Object.entries(config.with).filter((entry) => !!entry[1]).map(([key, value]) => ({ key, value }));
    }
    if (!config.columns) {
      selectedColumns = Object.keys(tableConfig.columns);
    }
    if (config.extras) {
      const extrasOrig = typeof config.extras === "function" ? config.extras(aliasedFields, { sql }) : config.extras;
      selectedExtras = Object.entries(extrasOrig).map(([key, value]) => ({
        key,
        value: mapColumnsInAliasedSQLToAlias(value, tableAlias)
      }));
    }
    for (const field of selectedColumns) {
      const column = tableConfig.columns[field];
      fieldsSelection[field] = column;
    }
    for (const { key, value } of selectedExtras) {
      fieldsSelection[key] = value;
    }
    let where;
    if (config.where) {
      const whereSql = typeof config.where === "function" ? config.where(aliasedFields, operators) : config.where;
      where = whereSql && mapColumnsInSQLToAlias(whereSql, tableAlias);
    }
    const groupBy = (tableConfig.primaryKey.length ? tableConfig.primaryKey : Object.values(tableConfig.columns)).map((c) => aliasedTableColumn(c, tableAlias));
    let orderByOrig = typeof config.orderBy === "function" ? config.orderBy(aliasedFields, orderByOperators) : config.orderBy ?? [];
    if (!Array.isArray(orderByOrig)) {
      orderByOrig = [orderByOrig];
    }
    const orderBy = orderByOrig.map((orderByValue) => {
      if (orderByValue instanceof Column) {
        return aliasedTableColumn(orderByValue, tableAlias);
      }
      return mapColumnsInSQLToAlias(orderByValue, tableAlias);
    });
    const builtRelations = [];
    const builtRelationFields = [];
    let result;
    let selectedRelationIndex = 0;
    for (const { key: selectedRelationKey, value: selectedRelationValue } of selectedRelations) {
      let relation;
      for (const [relationKey, relationValue] of Object.entries(tableConfig.relations)) {
        if (relationValue instanceof Relation && relationKey === selectedRelationKey) {
          relation = relationValue;
          break;
        }
      }
      if (!relation) {
        throw new Error(`Relation ${selectedRelationKey} not found`);
      }
      const normalizedRelation = normalizeRelation(schema, tableNamesMap, relation);
      const relationAlias = `${tableAlias}_${selectedRelationKey}`;
      const builtRelation = this.buildRelationalQuery(fullSchema, schema, tableNamesMap, fullSchema[tableNamesMap[relation.referencedTable[Table.Symbol.Name]]], schema[tableNamesMap[relation.referencedTable[Table.Symbol.Name]]], selectedRelationValue, relationAlias, normalizedRelation.references);
      builtRelations.push({ key: selectedRelationKey, value: builtRelation });
      let relationWhere;
      if (typeof selectedRelationValue === "object" && selectedRelationValue.limit) {
        const field2 = sql`${sql.identifier(relationAlias)}.${sql.identifier("__drizzle_row_number")}`;
        relationWhere = and(relationWhere, or(and(sql`${field2} <= ${selectedRelationValue.limit}`), sql`(${field2} is null)`));
      }
      const join = {
        table: builtRelation.sql instanceof Table ? aliasedTable(builtRelation.sql, relationAlias) : new Subquery(builtRelation.sql, {}, relationAlias),
        alias: relationAlias,
        on: and(...normalizedRelation.fields.map((field2, i) => eq(aliasedTableColumn(field2, tableAlias), aliasedTableColumn(normalizedRelation.references[i], relationAlias)))),
        joinType: "left"
      };
      const elseField = sql`json_arrayagg(json_array(${sql.join(builtRelation.selection.map(({ dbKey: key, isJson }) => {
        const field2 = sql`${sql.identifier(relationAlias)}.${sql.identifier(key)}`;
        return isJson ? sql`cast(${field2} as json)` : field2;
      }), sql`, `)}))`;
      const countSql = normalizedRelation.references.length === 1 ? aliasedTableColumn(normalizedRelation.references[0], relationAlias) : sql.fromList([
        sql`coalesce(`,
        sql.join(normalizedRelation.references.map((c) => aliasedTableColumn(c, relationAlias)), sql.raw(", ")),
        sql.raw(")")
      ]);
      const field = sql`if(count(${countSql}) = 0, '[]', ${elseField})`.as(selectedRelationKey);
      const builtRelationField = {
        path: [selectedRelationKey],
        field
      };
      result = this.buildSelectQuery({
        table: result ? new Subquery(result, {}, tableAlias) : aliasedTable(table, tableAlias),
        fields: {},
        fieldsFlat: [
          ...Object.entries(tableConfig.columns).map(([tsKey, column]) => ({
            path: [tsKey],
            field: aliasedTableColumn(column, tableAlias)
          })),
          ...selectedRelationIndex === selectedRelations.length - 1 ? selectedExtras.map(({ key, value }) => ({
            path: [key],
            field: value
          })) : [],
          ...builtRelationFields.map(({ path, field: field2 }) => ({
            path,
            field: sql`${sql.identifier(tableAlias)}.${sql.identifier(field2.fieldAlias)}`
          })),
          builtRelationField
        ],
        where: relationWhere,
        groupBy,
        orderBy: selectedRelationIndex === selectedRelations.length - 1 ? orderBy : [],
        joins: [join],
        withList: []
      });
      builtRelationFields.push(builtRelationField);
      selectedRelationIndex++;
    }
    const finalFieldsSelection = Object.entries(fieldsSelection).map(([key, value]) => {
      return {
        path: [key],
        field: value instanceof Column ? aliasedTableColumn(value, tableAlias) : value
      };
    });
    const finalFieldsFlat = isRoot ? [
      ...finalFieldsSelection.map(({ path, field }) => ({
        path,
        field: field instanceof SQL.Aliased ? sql`${sql.identifier(field.fieldAlias)}` : field
      })),
      ...builtRelationFields.map(({ path, field }) => ({
        path,
        field: sql`cast(${sql.identifier(field.fieldAlias)} as json)`
      }))
    ] : [
      ...Object.entries(tableConfig.columns).map(([tsKey, column]) => ({
        path: [tsKey],
        field: aliasedTableColumn(column, tableAlias)
      })),
      ...selectedExtras.map(({ key, value }) => ({
        path: [key],
        field: value
      })),
      ...builtRelationFields.map(({ path, field }) => ({
        path,
        field: sql`${sql.identifier(tableAlias)}.${sql.identifier(field.fieldAlias)}`
      }))
    ];
    if (finalFieldsFlat.length === 0) {
      finalFieldsFlat.push({
        path: [],
        field: sql.raw("1")
      });
    }
    if (!isRoot && !config.limit && orderBy.length > 0) {
      finalFieldsFlat.push({
        path: ["__drizzle_row_number"],
        field: sql`row_number() over(order by ${sql.join(orderBy, sql`, `)})`
      });
    }
    let limit, offset;
    if (config.limit !== void 0 || config.offset !== void 0) {
      if (isRoot) {
        limit = config.limit;
        offset = config.offset;
      } else {
        finalFieldsFlat.push({
          path: ["__drizzle_row_number"],
          field: sql`row_number() over(partition by ${relationColumns.map((c) => aliasedTableColumn(c, tableAlias))}${orderBy.length > 0 && !isRoot ? sql` order by ${sql.join(orderBy, sql`, `)}` : void 0})`.as("__drizzle_row_number")
        });
      }
    }
    result = this.buildSelectQuery({
      table: result ? new Subquery(result, {}, tableAlias) : aliasedTable(table, tableAlias),
      fields: {},
      fieldsFlat: finalFieldsFlat,
      where,
      groupBy: [],
      orderBy: isRoot ? orderBy : [],
      joins: [],
      withList: [],
      limit,
      offset
    });
    return {
      tableTsKey: tableConfig.tsName,
      sql: result,
      selection: [
        ...finalFieldsSelection.map(({ path, field }) => ({
          dbKey: field instanceof SQL.Aliased ? field.fieldAlias : tableConfig.columns[path[0]].name,
          tsKey: path[0],
          field,
          tableTsKey: void 0,
          isJson: false,
          selection: []
        })),
        ...builtRelations.map(({ key, value }) => ({
          dbKey: key,
          tsKey: key,
          field: void 0,
          tableTsKey: value.tableTsKey,
          isJson: true,
          selection: value.selection
        }))
      ]
    };
  }
};
var MySqlSelectBuilder = class {
  fields;
  session;
  dialect;
  withList;
  constructor(fields, session, dialect, withList = []) {
    this.fields = fields;
    this.session = session;
    this.dialect = dialect;
    this.withList = withList;
  }
  from(source) {
    const isPartialSelect = !!this.fields;
    let fields;
    if (this.fields) {
      fields = this.fields;
    } else if (source instanceof Subquery) {
      fields = Object.fromEntries(Object.keys(source[SubqueryConfig].selection).map((key) => [key, source[key]]));
    } else if (source instanceof MySqlViewBase) {
      fields = source[ViewBaseConfig].selectedFields;
    } else if (source instanceof SQL) {
      fields = {};
    } else {
      fields = getTableColumns(source);
    }
    return new MySqlSelect(source, fields, isPartialSelect, this.session, this.dialect, this.withList);
  }
};
var MySqlSelectQueryBuilder = class extends TypedQueryBuilder {
  isPartialSelect;
  session;
  dialect;
  _;
  config;
  joinsNotNullableMap;
  tableName;
  constructor(table, fields, isPartialSelect, session, dialect, withList) {
    super();
    this.isPartialSelect = isPartialSelect;
    this.session = session;
    this.dialect = dialect;
    this.config = {
      withList,
      table,
      fields: __spreadValues({}, fields),
      joins: [],
      orderBy: [],
      groupBy: []
    };
    this._ = {
      selectedFields: fields
    };
    this.tableName = getTableLikeName(table);
    this.joinsNotNullableMap = typeof this.tableName === "string" ? { [this.tableName]: true } : {};
  }
  createJoin(joinType) {
    return (table, on) => {
      const baseTableName = this.tableName;
      const tableName = getTableLikeName(table);
      if (typeof tableName === "string" && this.config.joins.some((join) => join.alias === tableName)) {
        throw new Error(`Alias "${tableName}" is already used in this query`);
      }
      if (!this.isPartialSelect) {
        if (Object.keys(this.joinsNotNullableMap).length === 1 && typeof baseTableName === "string") {
          this.config.fields = {
            [baseTableName]: this.config.fields
          };
        }
        if (typeof tableName === "string" && !(table instanceof SQL)) {
          const selection = table instanceof Subquery ? table[SubqueryConfig].selection : table instanceof View ? table[ViewBaseConfig].selectedFields : table[Table.Symbol.Columns];
          this.config.fields[tableName] = selection;
        }
      }
      if (typeof on === "function") {
        on = on(new Proxy(this.config.fields, new SelectionProxyHandler({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })));
      }
      this.config.joins.push({ on, table, joinType, alias: tableName });
      if (typeof tableName === "string") {
        switch (joinType) {
          case "left": {
            this.joinsNotNullableMap[tableName] = false;
            break;
          }
          case "right": {
            this.joinsNotNullableMap = Object.fromEntries(Object.entries(this.joinsNotNullableMap).map(([key]) => [key, false]));
            this.joinsNotNullableMap[tableName] = true;
            break;
          }
          case "inner": {
            this.joinsNotNullableMap[tableName] = true;
            break;
          }
          case "full": {
            this.joinsNotNullableMap = Object.fromEntries(Object.entries(this.joinsNotNullableMap).map(([key]) => [key, false]));
            this.joinsNotNullableMap[tableName] = false;
            break;
          }
        }
      }
      return this;
    };
  }
  leftJoin = this.createJoin("left");
  rightJoin = this.createJoin("right");
  innerJoin = this.createJoin("inner");
  fullJoin = this.createJoin("full");
  where(where) {
    if (typeof where === "function") {
      where = where(new Proxy(this.config.fields, new SelectionProxyHandler({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })));
    }
    this.config.where = where;
    return this;
  }
  having(having) {
    if (typeof having === "function") {
      having = having(new Proxy(this.config.fields, new SelectionProxyHandler({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })));
    }
    this.config.having = having;
    return this;
  }
  groupBy(...columns) {
    if (typeof columns[0] === "function") {
      const groupBy = columns[0](new Proxy(this.config.fields, new SelectionProxyHandler({ sqlAliasedBehavior: "alias", sqlBehavior: "sql" })));
      this.config.groupBy = Array.isArray(groupBy) ? groupBy : [groupBy];
    } else {
      this.config.groupBy = columns;
    }
    return this;
  }
  orderBy(...columns) {
    if (typeof columns[0] === "function") {
      const orderBy = columns[0](new Proxy(this.config.fields, new SelectionProxyHandler({ sqlAliasedBehavior: "alias", sqlBehavior: "sql" })));
      this.config.orderBy = Array.isArray(orderBy) ? orderBy : [orderBy];
    } else {
      this.config.orderBy = columns;
    }
    return this;
  }
  limit(limit) {
    this.config.limit = limit;
    return this;
  }
  offset(offset) {
    this.config.offset = offset;
    return this;
  }
  for(strength, config = {}) {
    this.config.lockingClause = { strength, config };
    return this;
  }
  getSQL() {
    return this.dialect.buildSelectQuery(this.config);
  }
  toSQL() {
    const _a = this.dialect.sqlToQuery(this.getSQL()), { typings: _typings } = _a, rest = __objRest(_a, ["typings"]);
    return rest;
  }
  as(alias) {
    return new Proxy(new Subquery(this.getSQL(), this.config.fields, alias), new SelectionProxyHandler({ alias, sqlAliasedBehavior: "alias", sqlBehavior: "error" }));
  }
};
var MySqlSelect = class extends MySqlSelectQueryBuilder {
  prepare() {
    if (!this.session) {
      throw new Error("Cannot execute a query on a query builder. Please use a database instance instead.");
    }
    const fieldsList = orderSelectedFields(this.config.fields);
    const query = this.session.prepareQuery(this.dialect.sqlToQuery(this.getSQL()), fieldsList);
    query.joinsNotNullableMap = this.joinsNotNullableMap;
    return query;
  }
  execute = (placeholderValues) => {
    return this.prepare().execute(placeholderValues);
  };
  createIterator = () => {
    const self = this;
    return async function* (placeholderValues) {
      yield* self.prepare().iterator(placeholderValues);
    };
  };
  iterator = this.createIterator();
};
applyMixins(MySqlSelect, [QueryPromise]);
var QueryBuilder = class {
  dialect;
  $with(alias) {
    const queryBuilder = this;
    return {
      as(qb) {
        if (typeof qb === "function") {
          qb = qb(queryBuilder);
        }
        return new Proxy(new WithSubquery(qb.getSQL(), qb.getSelectedFields(), alias, true), new SelectionProxyHandler({ alias, sqlAliasedBehavior: "alias", sqlBehavior: "error" }));
      }
    };
  }
  with(...queries) {
    const self = this;
    function select(fields) {
      return new MySqlSelectBuilder(fields ?? void 0, void 0, self.getDialect(), queries);
    }
    return { select };
  }
  select(fields) {
    return new MySqlSelectBuilder(fields ?? void 0, void 0, this.getDialect());
  }
  getDialect() {
    if (!this.dialect) {
      this.dialect = new MySqlDialect();
    }
    return this.dialect;
  }
};
var MySqlUpdateBuilder = class {
  table;
  session;
  dialect;
  constructor(table, session, dialect) {
    this.table = table;
    this.session = session;
    this.dialect = dialect;
  }
  set(values) {
    return new MySqlUpdate(this.table, mapUpdateSet(this.table, values), this.session, this.dialect);
  }
};
var MySqlUpdate = class extends QueryPromise {
  session;
  dialect;
  config;
  constructor(table, set, session, dialect) {
    super();
    this.session = session;
    this.dialect = dialect;
    this.config = { set, table };
  }
  where(where) {
    this.config.where = where;
    return this;
  }
  getSQL() {
    return this.dialect.buildUpdateQuery(this.config);
  }
  toSQL() {
    const _a = this.dialect.sqlToQuery(this.getSQL()), { typings: _typings } = _a, rest = __objRest(_a, ["typings"]);
    return rest;
  }
  prepare() {
    return this.session.prepareQuery(this.dialect.sqlToQuery(this.getSQL()), this.config.returning);
  }
  execute = (placeholderValues) => {
    return this.prepare().execute(placeholderValues);
  };
  createIterator = () => {
    const self = this;
    return async function* (placeholderValues) {
      yield* self.prepare().iterator(placeholderValues);
    };
  };
  iterator = this.createIterator();
};
var RelationalQueryBuilder = class {
  fullSchema;
  schema;
  tableNamesMap;
  table;
  tableConfig;
  dialect;
  session;
  constructor(fullSchema, schema, tableNamesMap, table, tableConfig, dialect, session) {
    this.fullSchema = fullSchema;
    this.schema = schema;
    this.tableNamesMap = tableNamesMap;
    this.table = table;
    this.tableConfig = tableConfig;
    this.dialect = dialect;
    this.session = session;
  }
  findMany(config) {
    return new MySqlRelationalQuery(this.fullSchema, this.schema, this.tableNamesMap, this.table, this.tableConfig, this.dialect, this.session, config ? config : {}, "many");
  }
  findFirst(config) {
    return new MySqlRelationalQuery(this.fullSchema, this.schema, this.tableNamesMap, this.table, this.tableConfig, this.dialect, this.session, config ? __spreadProps(__spreadValues({}, config), { limit: 1 }) : { limit: 1 }, "first");
  }
};
var MySqlRelationalQuery = class extends QueryPromise {
  fullSchema;
  schema;
  tableNamesMap;
  table;
  tableConfig;
  dialect;
  session;
  config;
  mode;
  constructor(fullSchema, schema, tableNamesMap, table, tableConfig, dialect, session, config, mode) {
    super();
    this.fullSchema = fullSchema;
    this.schema = schema;
    this.tableNamesMap = tableNamesMap;
    this.table = table;
    this.tableConfig = tableConfig;
    this.dialect = dialect;
    this.session = session;
    this.config = config;
    this.mode = mode;
  }
  prepare() {
    const query = this.dialect.buildRelationalQuery(this.fullSchema, this.schema, this.tableNamesMap, this.table, this.tableConfig, this.config, this.tableConfig.tsName, [], true);
    const builtQuery = this.dialect.sqlToQuery(query.sql);
    return this.session.prepareQuery(builtQuery, void 0, (rawRows) => {
      const rows = rawRows.map((row) => mapRelationalRow(this.schema, this.tableConfig, row, query.selection));
      if (this.mode === "first") {
        return rows[0];
      }
      return rows;
    });
  }
  execute() {
    return this.prepare().execute();
  }
};
var MySqlDatabase = class {
  dialect;
  session;
  query;
  constructor(dialect, session, schema) {
    this.dialect = dialect;
    this.session = session;
    this._ = schema ? { schema: schema.schema, tableNamesMap: schema.tableNamesMap } : { schema: void 0, tableNamesMap: {} };
    this.query = {};
    if (this._.schema) {
      for (const [tableName, columns] of Object.entries(this._.schema)) {
        this.query[tableName] = new RelationalQueryBuilder(schema.fullSchema, this._.schema, this._.tableNamesMap, schema.fullSchema[tableName], columns, dialect, session);
      }
    }
  }
  $with(alias) {
    return {
      as(qb) {
        if (typeof qb === "function") {
          qb = qb(new QueryBuilder());
        }
        return new Proxy(new WithSubquery(qb.getSQL(), qb.getSelectedFields(), alias, true), new SelectionProxyHandler({ alias, sqlAliasedBehavior: "alias", sqlBehavior: "error" }));
      }
    };
  }
  with(...queries) {
    const self = this;
    function select(fields) {
      return new MySqlSelectBuilder(fields ?? void 0, self.session, self.dialect, queries);
    }
    return { select };
  }
  select(fields) {
    return new MySqlSelectBuilder(fields ?? void 0, this.session, this.dialect);
  }
  update(table) {
    return new MySqlUpdateBuilder(table, this.session, this.dialect);
  }
  insert(table) {
    return new MySqlInsertBuilder(table, this.session, this.dialect);
  }
  delete(table) {
    return new MySqlDelete(table, this.session, this.dialect);
  }
  execute(query) {
    return this.session.execute(query.getSQL());
  }
  transaction(transaction, config) {
    return this.session.transaction(transaction, config);
  }
};
var PreparedQuery = class {
  joinsNotNullableMap;
};
var MySqlSession = class {
  dialect;
  constructor(dialect) {
    this.dialect = dialect;
  }
  execute(query) {
    return this.prepareQuery(this.dialect.sqlToQuery(query), void 0).execute();
  }
  getSetTransactionSQL(config) {
    const parts = [];
    if (config.isolationLevel) {
      parts.push(`isolation level ${config.isolationLevel}`);
    }
    return parts.length ? sql.fromList(["set transaction ", parts.join(" ")]) : void 0;
  }
  getStartTransactionSQL(config) {
    const parts = [];
    if (config.withConsistentSnapshot) {
      parts.push("with consistent snapshot");
    }
    if (config.accessMode) {
      parts.push(config.accessMode);
    }
    return parts.length ? sql.fromList(["start transaction ", parts.join(" ")]) : void 0;
  }
};
var MySqlTransaction = class extends MySqlDatabase {
  schema;
  nestedIndex;
  constructor(dialect, session, schema, nestedIndex = 0) {
    super(dialect, session, schema);
    this.schema = schema;
    this.nestedIndex = nestedIndex;
  }
  rollback() {
    throw new TransactionRollbackError();
  }
};

// node_modules/drizzle-orm/mysql-core/index.mjs
var MySqlSerialBuilder = class extends MySqlColumnBuilderWithAutoIncrement {
  constructor(name2) {
    super(name2);
    this.config.hasDefault = true;
    this.config.autoIncrement = true;
  }
  build(table) {
    return new MySqlSerial(table, this.config);
  }
};
var MySqlSerial = class extends MySqlColumnWithAutoIncrement {
  getSQLType() {
    return "serial";
  }
  mapFromDriverValue(value) {
    if (typeof value === "string") {
      return Number(value);
    }
    return value;
  }
};
function serial(name2) {
  return new MySqlSerialBuilder(name2);
}
var MySqlVarCharBuilder = class extends MySqlColumnBuilder {
  constructor(name2, config) {
    super(name2);
    this.config.length = config.length;
    this.config.enum = config.enum;
  }
  build(table) {
    return new MySqlVarChar(table, this.config);
  }
};
var MySqlVarChar = class extends MySqlColumn {
  length = this.config.length;
  enumValues = this.config.enum ?? [];
  getSQLType() {
    return this.length === void 0 ? `varchar` : `varchar(${this.length})`;
  }
};
function varchar(name2, config) {
  return new MySqlVarCharBuilder(name2, config);
}

// netlify/db/schema.ts
var users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  userId: varchar("userId", { length: 256 }),
  userAuthId: varchar("userAuthId", { length: 256 }),
  name: varchar("name", { length: 256 }),
  email: varchar("email", { length: 256 }),
  password: varchar("password", { length: 256 })
});
var userApiKeys = mysqlTable("userapikeys", {
  id: serial("id").primaryKey(),
  key: varchar("name", { length: 256 }),
  userId: varchar("userId", { length: 256 })
});

// node_modules/drizzle-orm/planetscale-serverless/index.mjs
var PlanetScalePreparedQuery = class extends PreparedQuery {
  client;
  queryString;
  params;
  logger;
  fields;
  customResultMapper;
  rawQuery = { as: "object" };
  query = { as: "array" };
  constructor(client, queryString, params, logger, fields, customResultMapper) {
    super();
    this.client = client;
    this.queryString = queryString;
    this.params = params;
    this.logger = logger;
    this.fields = fields;
    this.customResultMapper = customResultMapper;
  }
  async execute(placeholderValues = {}) {
    const params = fillPlaceholders(this.params, placeholderValues);
    this.logger.logQuery(this.queryString, params);
    const { fields, client, queryString, rawQuery, query, joinsNotNullableMap, customResultMapper } = this;
    if (!fields && !customResultMapper) {
      return client.execute(queryString, params, rawQuery);
    }
    const { rows } = await client.execute(queryString, params, query);
    if (customResultMapper) {
      return customResultMapper(rows);
    }
    return rows.map((row) => mapResultRow(fields, row, joinsNotNullableMap));
  }
  iterator(_placeholderValues) {
    throw new Error("Streaming is not supported by the PlanetScale Serverless driver");
  }
};
var PlanetscaleSession = class extends MySqlSession {
  baseClient;
  schema;
  options;
  logger;
  client;
  constructor(baseClient, dialect, tx, schema, options = {}) {
    super(dialect);
    this.baseClient = baseClient;
    this.schema = schema;
    this.options = options;
    this.client = tx ?? baseClient;
    this.logger = options.logger ?? new NoopLogger();
  }
  prepareQuery(query, fields, customResultMapper) {
    return new PlanetScalePreparedQuery(this.client, query.sql, query.params, this.logger, fields, customResultMapper);
  }
  async query(query, params) {
    this.logger.logQuery(query, params);
    return await this.client.execute(query, params, { as: "array" });
  }
  async queryObjects(query, params) {
    return this.client.execute(query, params, { as: "object" });
  }
  all(query) {
    const querySql = this.dialect.sqlToQuery(query);
    this.logger.logQuery(querySql.sql, querySql.params);
    return this.client.execute(querySql.sql, querySql.params, { as: "object" }).then((eQuery) => eQuery.rows);
  }
  transaction(transaction) {
    return this.baseClient.transaction((pstx) => {
      const session = new PlanetscaleSession(this.baseClient, this.dialect, pstx, this.schema, this.options);
      const tx = new PlanetScaleTransaction(this.dialect, session, this.schema);
      return transaction(tx);
    });
  }
};
var PlanetScaleTransaction = class extends MySqlTransaction {
  async transaction(transaction) {
    const savepointName = `sp${this.nestedIndex + 1}`;
    const tx = new PlanetScaleTransaction(this.dialect, this.session, this.schema, this.nestedIndex + 1);
    await tx.execute(sql.raw(`savepoint ${savepointName}`));
    try {
      const result = await transaction(tx);
      await tx.execute(sql.raw(`release savepoint ${savepointName}`));
      return result;
    } catch (err) {
      await tx.execute(sql.raw(`rollback to savepoint ${savepointName}`));
      throw err;
    }
  }
};
function drizzle(client, config = {}) {
  const dialect = new MySqlDialect();
  let logger;
  if (config.logger === true) {
    logger = new DefaultLogger();
  } else if (config.logger !== false) {
    logger = config.logger;
  }
  let schema;
  if (config.schema) {
    const tablesConfig = extractTablesRelationalConfig(config.schema, createTableRelationsHelpers);
    schema = {
      fullSchema: config.schema,
      schema: tablesConfig.tables,
      tableNamesMap: tablesConfig.tableNamesMap
    };
  }
  const session = new PlanetscaleSession(client, dialect, void 0, schema, { logger });
  return new MySqlDatabase(dialect, session, schema);
}

// node_modules/@planetscale/database/dist/sanitization.js
function format(query, values) {
  return Array.isArray(values) ? replacePosition(query, values) : replaceNamed(query, values);
}
function replacePosition(query, values) {
  let index = 0;
  return query.replace(/\?/g, (match) => {
    return index < values.length ? sanitize(values[index++]) : match;
  });
}
function replaceNamed(query, values) {
  return query.replace(/:(\w+)/g, (match, name2) => {
    return hasOwn(values, name2) ? sanitize(values[name2]) : match;
  });
}
function hasOwn(obj, name2) {
  return Object.prototype.hasOwnProperty.call(obj, name2);
}
function sanitize(value) {
  if (value == null) {
    return "null";
  }
  if (typeof value === "number") {
    return String(value);
  }
  if (typeof value === "boolean") {
    return value ? "true" : "false";
  }
  if (typeof value === "string") {
    return quote(value);
  }
  if (Array.isArray(value)) {
    return value.map(sanitize).join(", ");
  }
  if (value instanceof Date) {
    return quote(value.toISOString().replace("Z", ""));
  }
  return quote(value.toString());
}
function quote(text) {
  return `'${escape(text)}'`;
}
var re = /[\0\b\n\r\t\x1a\\"']/g;
function escape(text) {
  return text.replace(re, replacement);
}
function replacement(text) {
  switch (text) {
    case '"':
      return '\\"';
    case "'":
      return "\\'";
    case "\n":
      return "\\n";
    case "\r":
      return "\\r";
    case "	":
      return "\\t";
    case "\\":
      return "\\\\";
    case "\0":
      return "\\0";
    case "\b":
      return "\\b";
    case "":
      return "\\Z";
    default:
      return "";
  }
}

// node_modules/@planetscale/database/dist/text.js
var decoder = new TextDecoder("utf-8");
function decode(text) {
  return text ? decoder.decode(Uint8Array.from(bytes(text))) : "";
}
function bytes(text) {
  return text.split("").map((c) => c.charCodeAt(0));
}

// node_modules/@planetscale/database/dist/version.js
var Version = "1.7.0";

// node_modules/@planetscale/database/dist/index.js
var DatabaseError = class extends Error {
  constructor(message, status, body) {
    super(message);
    this.status = status;
    this.name = "DatabaseError";
    this.body = body;
  }
};
var defaultExecuteOptions = {
  as: "object"
};
var Tx = class {
  constructor(conn) {
    this.conn = conn;
  }
  async execute(query, args = null, options = defaultExecuteOptions) {
    return this.conn.execute(query, args, options);
  }
};
var Connection = class {
  constructor(config) {
    var _a;
    this.session = null;
    this.config = __spreadValues({}, config);
    if (typeof fetch !== "undefined") {
      (_a = this.config).fetch || (_a.fetch = fetch);
    }
    if (config.url) {
      const url = new URL(config.url);
      this.config.username = url.username;
      this.config.password = url.password;
      this.config.host = url.hostname;
    }
  }
  async transaction(fn) {
    const conn = new Connection(this.config);
    const tx = new Tx(conn);
    try {
      await tx.execute("BEGIN");
      const res = await fn(tx);
      await tx.execute("COMMIT");
      return res;
    } catch (err) {
      await tx.execute("ROLLBACK");
      throw err;
    }
  }
  async refresh() {
    await this.createSession();
  }
  async execute(query, args = null, options = defaultExecuteOptions) {
    const url = new URL("/psdb.v1alpha1.Database/Execute", `https://${this.config.host}`);
    const formatter = this.config.format || format;
    const sql2 = args ? formatter(query, args) : query;
    const saved = await postJSON(this.config, url, { query: sql2, session: this.session });
    const { result, session, error, timing } = saved;
    if (error) {
      throw new DatabaseError(error.message, 400, error);
    }
    const rowsAffected = (result == null ? void 0 : result.rowsAffected) ? parseInt(result.rowsAffected, 10) : 0;
    const insertId = (result == null ? void 0 : result.insertId) ?? "0";
    this.session = session;
    const fields = (result == null ? void 0 : result.fields) ?? [];
    for (const field of fields) {
      field.type || (field.type = "NULL");
    }
    const castFn = options.cast || this.config.cast || cast;
    const rows = result ? parse(result, castFn, options.as || "object") : [];
    const headers = fields.map((f) => f.name);
    const typeByName = (acc, { name: name2, type }) => __spreadProps(__spreadValues({}, acc), { [name2]: type });
    const types = fields.reduce(typeByName, {});
    const timingSeconds = timing ?? 0;
    return {
      headers,
      types,
      fields,
      rows,
      rowsAffected,
      insertId,
      size: rows.length,
      statement: sql2,
      time: timingSeconds * 1e3
    };
  }
  async createSession() {
    const url = new URL("/psdb.v1alpha1.Database/CreateSession", `https://${this.config.host}`);
    const { session } = await postJSON(this.config, url);
    this.session = session;
    return session;
  }
};
async function postJSON(config, url, body = {}) {
  const auth = btoa(`${config.username}:${config.password}`);
  const { fetch: fetch2 } = config;
  const response = await fetch2(url.toString(), {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "User-Agent": `database-js/${Version}`,
      Authorization: `Basic ${auth}`
    },
    cache: "no-store"
  });
  if (response.ok) {
    return await response.json();
  } else {
    let error = null;
    try {
      const e = (await response.json()).error;
      error = new DatabaseError(e.message, response.status, e);
    } catch {
      error = new DatabaseError(response.statusText, response.status, {
        code: "internal",
        message: response.statusText
      });
    }
    throw error;
  }
}
function connect(config) {
  return new Connection(config);
}
function parseArrayRow(fields, rawRow, cast2) {
  const row = decodeRow(rawRow);
  return fields.map((field, ix) => {
    return cast2(field, row[ix]);
  });
}
function parseObjectRow(fields, rawRow, cast2) {
  const row = decodeRow(rawRow);
  return fields.reduce((acc, field, ix) => {
    acc[field.name] = cast2(field, row[ix]);
    return acc;
  }, {});
}
function parse(result, cast2, returnAs) {
  const fields = result.fields;
  const rows = result.rows ?? [];
  return rows.map((row) => returnAs === "array" ? parseArrayRow(fields, row, cast2) : parseObjectRow(fields, row, cast2));
}
function decodeRow(row) {
  const values = row.values ? atob(row.values) : "";
  let offset = 0;
  return row.lengths.map((size) => {
    const width = parseInt(size, 10);
    if (width < 0)
      return null;
    const splice = values.substring(offset, offset + width);
    offset += width;
    return splice;
  });
}
function cast(field, value) {
  if (value === "" || value == null) {
    return value;
  }
  switch (field.type) {
    case "INT8":
    case "INT16":
    case "INT24":
    case "INT32":
    case "UINT8":
    case "UINT16":
    case "UINT24":
    case "UINT32":
    case "YEAR":
      return parseInt(value, 10);
    case "FLOAT32":
    case "FLOAT64":
      return parseFloat(value);
    case "DECIMAL":
    case "INT64":
    case "UINT64":
    case "DATE":
    case "TIME":
    case "DATETIME":
    case "TIMESTAMP":
    case "BLOB":
    case "BIT":
    case "VARBINARY":
    case "BINARY":
      return value;
    case "JSON":
      return JSON.parse(decode(value));
    default:
      return decode(value);
  }
}

// netlify/db/db.ts
var connection = connect({
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD
});
var db = drizzle(connection);

// netlify/functions/signup.ts
var secret = process.env.JWT_SECRET;
var handler = async (event, context) => {
  console.log("hit");
  const { name: name2, email, password } = JSON.parse(event.body);
  const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 15);
  try {
    const existingUser = await db.select().from(users).where(eq(users.email, email));
    if (existingUser.length > 0) {
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
          "Access-Control-Max-Age": "86400"
        },
        body: JSON.stringify({ success: false, message: "User already exists" })
      };
    }
    const salt = await import_bcrypt.default.genSalt(10);
    const hashedPassword = await import_bcrypt.default.hash(password, salt);
    const userId = nanoid();
    const user = await db.insert(users).values({
      name: name2,
      email,
      password: hashedPassword,
      userAuthId: nanoid(),
      userId
    });
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
        "Access-Control-Max-Age": "86400"
      },
      body: JSON.stringify({ success: true, data: { user } })
    };
  } catch (error) {
    console.log("error while adding user", error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
        "Access-Control-Max-Age": "86400"
      },
      body: JSON.stringify({ success: false, data: null })
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
//# sourceMappingURL=signup.js.map

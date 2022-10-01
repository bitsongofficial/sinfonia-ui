import * as protobuf from 'protobufjs/minimal'

const $Reader = protobuf.Reader,
	$Writer = protobuf.Writer,
	$util = protobuf.util;
const $root = {};
export const cosmos = (() => {
	const cosmos = {};
	cosmos.base = (function() {
		const base = {};
		base.v1beta1 = (function() {
			const v1beta1 = {};
			v1beta1.Coin = (function() {
				function Coin(p) {
					if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
				}
				Coin.prototype.denom = '';
				Coin.prototype.amount = '';
				Coin.create = function create(properties) {
					return new Coin(properties);
				};
				Coin.encode = function encode(m, w) {
					if (!w) w = $Writer.create();
					if (m.denom != null && Object.hasOwnProperty.call(m, 'denom')) w.uint32(10).string(m.denom);
					if (m.amount != null && Object.hasOwnProperty.call(m, 'amount')) w.uint32(18).string(m.amount);
					return w;
				};
				Coin.decode = function decode(r, l) {
					if (!(r instanceof $Reader)) r = $Reader.create(r);
					var c = l === undefined ? r.len : r.pos + l,
						m = new cosmos.base.v1beta1.Coin();
					while (r.pos < c) {
						var t = r.uint32();
						switch (t >>> 3) {
							case 1:
								m.denom = r.string();
								break;
							case 2:
								m.amount = r.string();
								break;
							default:
								r.skipType(t & 7);
								break;
						}
					}
					return m;
				};
				Coin.fromObject = function fromObject(d) {
					if (d instanceof cosmos.base.v1beta1.Coin) return d;
					var m = new cosmos.base.v1beta1.Coin();
					if (d.denom != null) {
						m.denom = String(d.denom);
					}
					if (d.amount != null) {
						m.amount = String(d.amount);
					}
					return m;
				};
				Coin.toObject = function toObject(m, o) {
					if (!o) o = {};
					var d = {};
					if (o.defaults) {
						d.denom = '';
						d.amount = '';
					}
					if (m.denom != null && m.hasOwnProperty('denom')) {
						d.denom = m.denom;
					}
					if (m.amount != null && m.hasOwnProperty('amount')) {
						d.amount = m.amount;
					}
					return d;
				};
				Coin.prototype.toJSON = function toJSON() {
					return this.constructor.toObject(this, protobuf.util.toJSONOptions);
				};
				return Coin;
			})();
			v1beta1.DecCoin = (function() {
				function DecCoin(p) {
					if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
				}
				DecCoin.prototype.denom = '';
				DecCoin.prototype.amount = '';
				DecCoin.create = function create(properties) {
					return new DecCoin(properties);
				};
				DecCoin.encode = function encode(m, w) {
					if (!w) w = $Writer.create();
					if (m.denom != null && Object.hasOwnProperty.call(m, 'denom')) w.uint32(10).string(m.denom);
					if (m.amount != null && Object.hasOwnProperty.call(m, 'amount')) w.uint32(18).string(m.amount);
					return w;
				};
				DecCoin.decode = function decode(r, l) {
					if (!(r instanceof $Reader)) r = $Reader.create(r);
					var c = l === undefined ? r.len : r.pos + l,
						m = new cosmos.base.v1beta1.DecCoin();
					while (r.pos < c) {
						var t = r.uint32();
						switch (t >>> 3) {
							case 1:
								m.denom = r.string();
								break;
							case 2:
								m.amount = r.string();
								break;
							default:
								r.skipType(t & 7);
								break;
						}
					}
					return m;
				};
				DecCoin.fromObject = function fromObject(d) {
					if (d instanceof cosmos.base.v1beta1.DecCoin) return d;
					var m = new cosmos.base.v1beta1.DecCoin();
					if (d.denom != null) {
						m.denom = String(d.denom);
					}
					if (d.amount != null) {
						m.amount = String(d.amount);
					}
					return m;
				};
				DecCoin.toObject = function toObject(m, o) {
					if (!o) o = {};
					var d = {};
					if (o.defaults) {
						d.denom = '';
						d.amount = '';
					}
					if (m.denom != null && m.hasOwnProperty('denom')) {
						d.denom = m.denom;
					}
					if (m.amount != null && m.hasOwnProperty('amount')) {
						d.amount = m.amount;
					}
					return d;
				};
				DecCoin.prototype.toJSON = function toJSON() {
					return this.constructor.toObject(this, protobuf.util.toJSONOptions);
				};
				return DecCoin;
			})();
			v1beta1.IntProto = (function() {
				function IntProto(p) {
					if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
				}
				IntProto.prototype.int = '';
				IntProto.create = function create(properties) {
					return new IntProto(properties);
				};
				IntProto.encode = function encode(m, w) {
					if (!w) w = $Writer.create();
					if (m.int != null && Object.hasOwnProperty.call(m, 'int')) w.uint32(10).string(m.int);
					return w;
				};
				IntProto.decode = function decode(r, l) {
					if (!(r instanceof $Reader)) r = $Reader.create(r);
					var c = l === undefined ? r.len : r.pos + l,
						m = new cosmos.base.v1beta1.IntProto();
					while (r.pos < c) {
						var t = r.uint32();
						switch (t >>> 3) {
							case 1:
								m.int = r.string();
								break;
							default:
								r.skipType(t & 7);
								break;
						}
					}
					return m;
				};
				IntProto.fromObject = function fromObject(d) {
					if (d instanceof cosmos.base.v1beta1.IntProto) return d;
					var m = new cosmos.base.v1beta1.IntProto();
					if (d.int != null) {
						m.int = String(d.int);
					}
					return m;
				};
				IntProto.toObject = function toObject(m, o) {
					if (!o) o = {};
					var d = {};
					if (o.defaults) {
						d.int = '';
					}
					if (m.int != null && m.hasOwnProperty('int')) {
						d.int = m.int;
					}
					return d;
				};
				IntProto.prototype.toJSON = function toJSON() {
					return this.constructor.toObject(this, protobuf.util.toJSONOptions);
				};
				return IntProto;
			})();
			v1beta1.DecProto = (function() {
				function DecProto(p) {
					if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
				}
				DecProto.prototype.dec = '';
				DecProto.create = function create(properties) {
					return new DecProto(properties);
				};
				DecProto.encode = function encode(m, w) {
					if (!w) w = $Writer.create();
					if (m.dec != null && Object.hasOwnProperty.call(m, 'dec')) w.uint32(10).string(m.dec);
					return w;
				};
				DecProto.decode = function decode(r, l) {
					if (!(r instanceof $Reader)) r = $Reader.create(r);
					var c = l === undefined ? r.len : r.pos + l,
						m = new cosmos.base.v1beta1.DecProto();
					while (r.pos < c) {
						var t = r.uint32();
						switch (t >>> 3) {
							case 1:
								m.dec = r.string();
								break;
							default:
								r.skipType(t & 7);
								break;
						}
					}
					return m;
				};
				DecProto.fromObject = function fromObject(d) {
					if (d instanceof cosmos.base.v1beta1.DecProto) return d;
					var m = new cosmos.base.v1beta1.DecProto();
					if (d.dec != null) {
						m.dec = String(d.dec);
					}
					return m;
				};
				DecProto.toObject = function toObject(m, o) {
					if (!o) o = {};
					var d = {};
					if (o.defaults) {
						d.dec = '';
					}
					if (m.dec != null && m.hasOwnProperty('dec')) {
						d.dec = m.dec;
					}
					return d;
				};
				DecProto.prototype.toJSON = function toJSON() {
					return this.constructor.toObject(this, protobuf.util.toJSONOptions);
				};
				return DecProto;
			})();
			return v1beta1;
		})();
		return base;
	})();
	cosmos.bank = (function() {
		const bank = {};
		bank.v1beta1 = (function() {
			const v1beta1 = {};
			v1beta1.Params = (function() {
				function Params(p) {
					this.sendEnabled = [];
					if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
				}
				Params.prototype.sendEnabled = $util.emptyArray;
				Params.prototype.defaultSendEnabled = false;
				Params.create = function create(properties) {
					return new Params(properties);
				};
				Params.encode = function encode(m, w) {
					if (!w) w = $Writer.create();
					if (m.sendEnabled != null && m.sendEnabled.length) {
						for (var i = 0; i < m.sendEnabled.length; ++i)
							cosmos.bank.v1beta1.SendEnabled.encode(m.sendEnabled[i], w.uint32(10).fork()).ldelim();
					}
					if (m.defaultSendEnabled != null && Object.hasOwnProperty.call(m, 'defaultSendEnabled'))
						w.uint32(16).bool(m.defaultSendEnabled);
					return w;
				};
				Params.decode = function decode(r, l) {
					if (!(r instanceof $Reader)) r = $Reader.create(r);
					var c = l === undefined ? r.len : r.pos + l,
						m = new cosmos.bank.v1beta1.Params();
					while (r.pos < c) {
						var t = r.uint32();
						switch (t >>> 3) {
							case 1:
								if (!(m.sendEnabled && m.sendEnabled.length)) m.sendEnabled = [];
								m.sendEnabled.push(cosmos.bank.v1beta1.SendEnabled.decode(r, r.uint32()));
								break;
							case 2:
								m.defaultSendEnabled = r.bool();
								break;
							default:
								r.skipType(t & 7);
								break;
						}
					}
					return m;
				};
				Params.fromObject = function fromObject(d) {
					if (d instanceof cosmos.bank.v1beta1.Params) return d;
					var m = new cosmos.bank.v1beta1.Params();
					if (d.sendEnabled) {
						if (!Array.isArray(d.sendEnabled))
							throw TypeError('.cosmos.bank.v1beta1.Params.sendEnabled: array expected');
						m.sendEnabled = [];
						for (var i = 0; i < d.sendEnabled.length; ++i) {
							if (typeof d.sendEnabled[i] !== 'object')
								throw TypeError('.cosmos.bank.v1beta1.Params.sendEnabled: object expected');
							m.sendEnabled[i] = cosmos.bank.v1beta1.SendEnabled.fromObject(d.sendEnabled[i]);
						}
					}
					if (d.defaultSendEnabled != null) {
						m.defaultSendEnabled = Boolean(d.defaultSendEnabled);
					}
					return m;
				};
				Params.toObject = function toObject(m, o) {
					if (!o) o = {};
					var d = {};
					if (o.arrays || o.defaults) {
						d.sendEnabled = [];
					}
					if (o.defaults) {
						d.defaultSendEnabled = false;
					}
					if (m.sendEnabled && m.sendEnabled.length) {
						d.sendEnabled = [];
						for (var j = 0; j < m.sendEnabled.length; ++j) {
							d.sendEnabled[j] = cosmos.bank.v1beta1.SendEnabled.toObject(m.sendEnabled[j], o);
						}
					}
					if (m.defaultSendEnabled != null && m.hasOwnProperty('defaultSendEnabled')) {
						d.defaultSendEnabled = m.defaultSendEnabled;
					}
					return d;
				};
				Params.prototype.toJSON = function toJSON() {
					return this.constructor.toObject(this, protobuf.util.toJSONOptions);
				};
				return Params;
			})();
			v1beta1.SendEnabled = (function() {
				function SendEnabled(p) {
					if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
				}
				SendEnabled.prototype.denom = '';
				SendEnabled.prototype.enabled = false;
				SendEnabled.create = function create(properties) {
					return new SendEnabled(properties);
				};
				SendEnabled.encode = function encode(m, w) {
					if (!w) w = $Writer.create();
					if (m.denom != null && Object.hasOwnProperty.call(m, 'denom')) w.uint32(10).string(m.denom);
					if (m.enabled != null && Object.hasOwnProperty.call(m, 'enabled')) w.uint32(16).bool(m.enabled);
					return w;
				};
				SendEnabled.decode = function decode(r, l) {
					if (!(r instanceof $Reader)) r = $Reader.create(r);
					var c = l === undefined ? r.len : r.pos + l,
						m = new cosmos.bank.v1beta1.SendEnabled();
					while (r.pos < c) {
						var t = r.uint32();
						switch (t >>> 3) {
							case 1:
								m.denom = r.string();
								break;
							case 2:
								m.enabled = r.bool();
								break;
							default:
								r.skipType(t & 7);
								break;
						}
					}
					return m;
				};
				SendEnabled.fromObject = function fromObject(d) {
					if (d instanceof cosmos.bank.v1beta1.SendEnabled) return d;
					var m = new cosmos.bank.v1beta1.SendEnabled();
					if (d.denom != null) {
						m.denom = String(d.denom);
					}
					if (d.enabled != null) {
						m.enabled = Boolean(d.enabled);
					}
					return m;
				};
				SendEnabled.toObject = function toObject(m, o) {
					if (!o) o = {};
					var d = {};
					if (o.defaults) {
						d.denom = '';
						d.enabled = false;
					}
					if (m.denom != null && m.hasOwnProperty('denom')) {
						d.denom = m.denom;
					}
					if (m.enabled != null && m.hasOwnProperty('enabled')) {
						d.enabled = m.enabled;
					}
					return d;
				};
				SendEnabled.prototype.toJSON = function toJSON() {
					return this.constructor.toObject(this, protobuf.util.toJSONOptions);
				};
				return SendEnabled;
			})();
			v1beta1.Input = (function() {
				function Input(p) {
					this.coins = [];
					if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
				}
				Input.prototype.address = '';
				Input.prototype.coins = $util.emptyArray;
				Input.create = function create(properties) {
					return new Input(properties);
				};
				Input.encode = function encode(m, w) {
					if (!w) w = $Writer.create();
					if (m.address != null && Object.hasOwnProperty.call(m, 'address')) w.uint32(10).string(m.address);
					if (m.coins != null && m.coins.length) {
						for (var i = 0; i < m.coins.length; ++i)
							cosmos.base.v1beta1.Coin.encode(m.coins[i], w.uint32(18).fork()).ldelim();
					}
					return w;
				};
				Input.decode = function decode(r, l) {
					if (!(r instanceof $Reader)) r = $Reader.create(r);
					var c = l === undefined ? r.len : r.pos + l,
						m = new cosmos.bank.v1beta1.Input();
					while (r.pos < c) {
						var t = r.uint32();
						switch (t >>> 3) {
							case 1:
								m.address = r.string();
								break;
							case 2:
								if (!(m.coins && m.coins.length)) m.coins = [];
								m.coins.push(cosmos.base.v1beta1.Coin.decode(r, r.uint32()));
								break;
							default:
								r.skipType(t & 7);
								break;
						}
					}
					return m;
				};
				Input.fromObject = function fromObject(d) {
					if (d instanceof cosmos.bank.v1beta1.Input) return d;
					var m = new cosmos.bank.v1beta1.Input();
					if (d.address != null) {
						m.address = String(d.address);
					}
					if (d.coins) {
						if (!Array.isArray(d.coins)) throw TypeError('.cosmos.bank.v1beta1.Input.coins: array expected');
						m.coins = [];
						for (var i = 0; i < d.coins.length; ++i) {
							if (typeof d.coins[i] !== 'object') throw TypeError('.cosmos.bank.v1beta1.Input.coins: object expected');
							m.coins[i] = cosmos.base.v1beta1.Coin.fromObject(d.coins[i]);
						}
					}
					return m;
				};
				Input.toObject = function toObject(m, o) {
					if (!o) o = {};
					var d = {};
					if (o.arrays || o.defaults) {
						d.coins = [];
					}
					if (o.defaults) {
						d.address = '';
					}
					if (m.address != null && m.hasOwnProperty('address')) {
						d.address = m.address;
					}
					if (m.coins && m.coins.length) {
						d.coins = [];
						for (var j = 0; j < m.coins.length; ++j) {
							d.coins[j] = cosmos.base.v1beta1.Coin.toObject(m.coins[j], o);
						}
					}
					return d;
				};
				Input.prototype.toJSON = function toJSON() {
					return this.constructor.toObject(this, protobuf.util.toJSONOptions);
				};
				return Input;
			})();
			v1beta1.Output = (function() {
				function Output(p) {
					this.coins = [];
					if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
				}
				Output.prototype.address = '';
				Output.prototype.coins = $util.emptyArray;
				Output.create = function create(properties) {
					return new Output(properties);
				};
				Output.encode = function encode(m, w) {
					if (!w) w = $Writer.create();
					if (m.address != null && Object.hasOwnProperty.call(m, 'address')) w.uint32(10).string(m.address);
					if (m.coins != null && m.coins.length) {
						for (var i = 0; i < m.coins.length; ++i)
							cosmos.base.v1beta1.Coin.encode(m.coins[i], w.uint32(18).fork()).ldelim();
					}
					return w;
				};
				Output.decode = function decode(r, l) {
					if (!(r instanceof $Reader)) r = $Reader.create(r);
					var c = l === undefined ? r.len : r.pos + l,
						m = new cosmos.bank.v1beta1.Output();
					while (r.pos < c) {
						var t = r.uint32();
						switch (t >>> 3) {
							case 1:
								m.address = r.string();
								break;
							case 2:
								if (!(m.coins && m.coins.length)) m.coins = [];
								m.coins.push(cosmos.base.v1beta1.Coin.decode(r, r.uint32()));
								break;
							default:
								r.skipType(t & 7);
								break;
						}
					}
					return m;
				};
				Output.fromObject = function fromObject(d) {
					if (d instanceof cosmos.bank.v1beta1.Output) return d;
					var m = new cosmos.bank.v1beta1.Output();
					if (d.address != null) {
						m.address = String(d.address);
					}
					if (d.coins) {
						if (!Array.isArray(d.coins)) throw TypeError('.cosmos.bank.v1beta1.Output.coins: array expected');
						m.coins = [];
						for (var i = 0; i < d.coins.length; ++i) {
							if (typeof d.coins[i] !== 'object') throw TypeError('.cosmos.bank.v1beta1.Output.coins: object expected');
							m.coins[i] = cosmos.base.v1beta1.Coin.fromObject(d.coins[i]);
						}
					}
					return m;
				};
				Output.toObject = function toObject(m, o) {
					if (!o) o = {};
					var d = {};
					if (o.arrays || o.defaults) {
						d.coins = [];
					}
					if (o.defaults) {
						d.address = '';
					}
					if (m.address != null && m.hasOwnProperty('address')) {
						d.address = m.address;
					}
					if (m.coins && m.coins.length) {
						d.coins = [];
						for (var j = 0; j < m.coins.length; ++j) {
							d.coins[j] = cosmos.base.v1beta1.Coin.toObject(m.coins[j], o);
						}
					}
					return d;
				};
				Output.prototype.toJSON = function toJSON() {
					return this.constructor.toObject(this, protobuf.util.toJSONOptions);
				};
				return Output;
			})();
			v1beta1.Supply = (function() {
				function Supply(p) {
					this.total = [];
					if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
				}
				Supply.prototype.total = $util.emptyArray;
				Supply.create = function create(properties) {
					return new Supply(properties);
				};
				Supply.encode = function encode(m, w) {
					if (!w) w = $Writer.create();
					if (m.total != null && m.total.length) {
						for (var i = 0; i < m.total.length; ++i)
							cosmos.base.v1beta1.Coin.encode(m.total[i], w.uint32(10).fork()).ldelim();
					}
					return w;
				};
				Supply.decode = function decode(r, l) {
					if (!(r instanceof $Reader)) r = $Reader.create(r);
					var c = l === undefined ? r.len : r.pos + l,
						m = new cosmos.bank.v1beta1.Supply();
					while (r.pos < c) {
						var t = r.uint32();
						switch (t >>> 3) {
							case 1:
								if (!(m.total && m.total.length)) m.total = [];
								m.total.push(cosmos.base.v1beta1.Coin.decode(r, r.uint32()));
								break;
							default:
								r.skipType(t & 7);
								break;
						}
					}
					return m;
				};
				Supply.fromObject = function fromObject(d) {
					if (d instanceof cosmos.bank.v1beta1.Supply) return d;
					var m = new cosmos.bank.v1beta1.Supply();
					if (d.total) {
						if (!Array.isArray(d.total)) throw TypeError('.cosmos.bank.v1beta1.Supply.total: array expected');
						m.total = [];
						for (var i = 0; i < d.total.length; ++i) {
							if (typeof d.total[i] !== 'object') throw TypeError('.cosmos.bank.v1beta1.Supply.total: object expected');
							m.total[i] = cosmos.base.v1beta1.Coin.fromObject(d.total[i]);
						}
					}
					return m;
				};
				Supply.toObject = function toObject(m, o) {
					if (!o) o = {};
					var d = {};
					if (o.arrays || o.defaults) {
						d.total = [];
					}
					if (m.total && m.total.length) {
						d.total = [];
						for (var j = 0; j < m.total.length; ++j) {
							d.total[j] = cosmos.base.v1beta1.Coin.toObject(m.total[j], o);
						}
					}
					return d;
				};
				Supply.prototype.toJSON = function toJSON() {
					return this.constructor.toObject(this, protobuf.util.toJSONOptions);
				};
				return Supply;
			})();
			v1beta1.DenomUnit = (function() {
				function DenomUnit(p) {
					this.aliases = [];
					if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
				}
				DenomUnit.prototype.denom = '';
				DenomUnit.prototype.exponent = 0;
				DenomUnit.prototype.aliases = $util.emptyArray;
				DenomUnit.create = function create(properties) {
					return new DenomUnit(properties);
				};
				DenomUnit.encode = function encode(m, w) {
					if (!w) w = $Writer.create();
					if (m.denom != null && Object.hasOwnProperty.call(m, 'denom')) w.uint32(10).string(m.denom);
					if (m.exponent != null && Object.hasOwnProperty.call(m, 'exponent')) w.uint32(16).uint32(m.exponent);
					if (m.aliases != null && m.aliases.length) {
						for (var i = 0; i < m.aliases.length; ++i) w.uint32(26).string(m.aliases[i]);
					}
					return w;
				};
				DenomUnit.decode = function decode(r, l) {
					if (!(r instanceof $Reader)) r = $Reader.create(r);
					var c = l === undefined ? r.len : r.pos + l,
						m = new cosmos.bank.v1beta1.DenomUnit();
					while (r.pos < c) {
						var t = r.uint32();
						switch (t >>> 3) {
							case 1:
								m.denom = r.string();
								break;
							case 2:
								m.exponent = r.uint32();
								break;
							case 3:
								if (!(m.aliases && m.aliases.length)) m.aliases = [];
								m.aliases.push(r.string());
								break;
							default:
								r.skipType(t & 7);
								break;
						}
					}
					return m;
				};
				DenomUnit.fromObject = function fromObject(d) {
					if (d instanceof cosmos.bank.v1beta1.DenomUnit) return d;
					var m = new cosmos.bank.v1beta1.DenomUnit();
					if (d.denom != null) {
						m.denom = String(d.denom);
					}
					if (d.exponent != null) {
						m.exponent = d.exponent >>> 0;
					}
					if (d.aliases) {
						if (!Array.isArray(d.aliases)) throw TypeError('.cosmos.bank.v1beta1.DenomUnit.aliases: array expected');
						m.aliases = [];
						for (var i = 0; i < d.aliases.length; ++i) {
							m.aliases[i] = String(d.aliases[i]);
						}
					}
					return m;
				};
				DenomUnit.toObject = function toObject(m, o) {
					if (!o) o = {};
					var d = {};
					if (o.arrays || o.defaults) {
						d.aliases = [];
					}
					if (o.defaults) {
						d.denom = '';
						d.exponent = 0;
					}
					if (m.denom != null && m.hasOwnProperty('denom')) {
						d.denom = m.denom;
					}
					if (m.exponent != null && m.hasOwnProperty('exponent')) {
						d.exponent = m.exponent;
					}
					if (m.aliases && m.aliases.length) {
						d.aliases = [];
						for (var j = 0; j < m.aliases.length; ++j) {
							d.aliases[j] = m.aliases[j];
						}
					}
					return d;
				};
				DenomUnit.prototype.toJSON = function toJSON() {
					return this.constructor.toObject(this, protobuf.util.toJSONOptions);
				};
				return DenomUnit;
			})();
			v1beta1.Metadata = (function() {
				function Metadata(p) {
					this.denomUnits = [];
					if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
				}
				Metadata.prototype.description = '';
				Metadata.prototype.denomUnits = $util.emptyArray;
				Metadata.prototype.base = '';
				Metadata.prototype.display = '';
				Metadata.prototype.name = '';
				Metadata.prototype.symbol = '';
				Metadata.create = function create(properties) {
					return new Metadata(properties);
				};
				Metadata.encode = function encode(m, w) {
					if (!w) w = $Writer.create();
					if (m.description != null && Object.hasOwnProperty.call(m, 'description')) w.uint32(10).string(m.description);
					if (m.denomUnits != null && m.denomUnits.length) {
						for (var i = 0; i < m.denomUnits.length; ++i)
							cosmos.bank.v1beta1.DenomUnit.encode(m.denomUnits[i], w.uint32(18).fork()).ldelim();
					}
					if (m.base != null && Object.hasOwnProperty.call(m, 'base')) w.uint32(26).string(m.base);
					if (m.display != null && Object.hasOwnProperty.call(m, 'display')) w.uint32(34).string(m.display);
					if (m.name != null && Object.hasOwnProperty.call(m, 'name')) w.uint32(42).string(m.name);
					if (m.symbol != null && Object.hasOwnProperty.call(m, 'symbol')) w.uint32(50).string(m.symbol);
					return w;
				};
				Metadata.decode = function decode(r, l) {
					if (!(r instanceof $Reader)) r = $Reader.create(r);
					var c = l === undefined ? r.len : r.pos + l,
						m = new cosmos.bank.v1beta1.Metadata();
					while (r.pos < c) {
						var t = r.uint32();
						switch (t >>> 3) {
							case 1:
								m.description = r.string();
								break;
							case 2:
								if (!(m.denomUnits && m.denomUnits.length)) m.denomUnits = [];
								m.denomUnits.push(cosmos.bank.v1beta1.DenomUnit.decode(r, r.uint32()));
								break;
							case 3:
								m.base = r.string();
								break;
							case 4:
								m.display = r.string();
								break;
							case 5:
								m.name = r.string();
								break;
							case 6:
								m.symbol = r.string();
								break;
							default:
								r.skipType(t & 7);
								break;
						}
					}
					return m;
				};
				Metadata.fromObject = function fromObject(d) {
					if (d instanceof cosmos.bank.v1beta1.Metadata) return d;
					var m = new cosmos.bank.v1beta1.Metadata();
					if (d.description != null) {
						m.description = String(d.description);
					}
					if (d.denomUnits) {
						if (!Array.isArray(d.denomUnits))
							throw TypeError('.cosmos.bank.v1beta1.Metadata.denomUnits: array expected');
						m.denomUnits = [];
						for (var i = 0; i < d.denomUnits.length; ++i) {
							if (typeof d.denomUnits[i] !== 'object')
								throw TypeError('.cosmos.bank.v1beta1.Metadata.denomUnits: object expected');
							m.denomUnits[i] = cosmos.bank.v1beta1.DenomUnit.fromObject(d.denomUnits[i]);
						}
					}
					if (d.base != null) {
						m.base = String(d.base);
					}
					if (d.display != null) {
						m.display = String(d.display);
					}
					if (d.name != null) {
						m.name = String(d.name);
					}
					if (d.symbol != null) {
						m.symbol = String(d.symbol);
					}
					return m;
				};
				Metadata.toObject = function toObject(m, o) {
					if (!o) o = {};
					var d = {};
					if (o.arrays || o.defaults) {
						d.denomUnits = [];
					}
					if (o.defaults) {
						d.description = '';
						d.base = '';
						d.display = '';
						d.name = '';
						d.symbol = '';
					}
					if (m.description != null && m.hasOwnProperty('description')) {
						d.description = m.description;
					}
					if (m.denomUnits && m.denomUnits.length) {
						d.denomUnits = [];
						for (var j = 0; j < m.denomUnits.length; ++j) {
							d.denomUnits[j] = cosmos.bank.v1beta1.DenomUnit.toObject(m.denomUnits[j], o);
						}
					}
					if (m.base != null && m.hasOwnProperty('base')) {
						d.base = m.base;
					}
					if (m.display != null && m.hasOwnProperty('display')) {
						d.display = m.display;
					}
					if (m.name != null && m.hasOwnProperty('name')) {
						d.name = m.name;
					}
					if (m.symbol != null && m.hasOwnProperty('symbol')) {
						d.symbol = m.symbol;
					}
					return d;
				};
				Metadata.prototype.toJSON = function toJSON() {
					return this.constructor.toObject(this, protobuf.util.toJSONOptions);
				};
				return Metadata;
			})();
			return v1beta1;
		})();
		return bank;
	})();
	return cosmos;
})();
export const osmosis = (() => {
	const osmosis = {};
	osmosis.gamm = (function() {
		const gamm = {};
		gamm.v1beta1 = (function() {
			const v1beta1 = {};
			v1beta1.PoolAsset = (function() {
				function PoolAsset(p) {
					if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
				}
				PoolAsset.prototype.token = null;
				PoolAsset.prototype.weight = '';
				PoolAsset.create = function create(properties) {
					return new PoolAsset(properties);
				};
				PoolAsset.encode = function encode(m, w) {
					if (!w) w = $Writer.create();
					if (m.token != null && Object.hasOwnProperty.call(m, 'token'))
						cosmos.base.v1beta1.Coin.encode(m.token, w.uint32(10).fork()).ldelim();
					if (m.weight != null && Object.hasOwnProperty.call(m, 'weight')) w.uint32(18).string(m.weight);
					return w;
				};
				PoolAsset.decode = function decode(r, l) {
					if (!(r instanceof $Reader)) r = $Reader.create(r);
					var c = l === undefined ? r.len : r.pos + l,
						m = new osmosis.gamm.v1beta1.PoolAsset();
					while (r.pos < c) {
						var t = r.uint32();
						switch (t >>> 3) {
							case 1:
								m.token = cosmos.base.v1beta1.Coin.decode(r, r.uint32());
								break;
							case 2:
								m.weight = r.string();
								break;
							default:
								r.skipType(t & 7);
								break;
						}
					}
					return m;
				};
				PoolAsset.fromObject = function fromObject(d) {
					if (d instanceof osmosis.gamm.v1beta1.PoolAsset) return d;
					var m = new osmosis.gamm.v1beta1.PoolAsset();
					if (d.token != null) {
						if (typeof d.token !== 'object') throw TypeError('.osmosis.gamm.v1beta1.PoolAsset.token: object expected');
						m.token = cosmos.base.v1beta1.Coin.fromObject(d.token);
					}
					if (d.weight != null) {
						m.weight = String(d.weight);
					}
					return m;
				};
				PoolAsset.toObject = function toObject(m, o) {
					if (!o) o = {};
					var d = {};
					if (o.defaults) {
						d.token = null;
						d.weight = '';
					}
					if (m.token != null && m.hasOwnProperty('token')) {
						d.token = cosmos.base.v1beta1.Coin.toObject(m.token, o);
					}
					if (m.weight != null && m.hasOwnProperty('weight')) {
						d.weight = m.weight;
					}
					return d;
				};
				PoolAsset.prototype.toJSON = function toJSON() {
					return this.constructor.toObject(this, protobuf.util.toJSONOptions);
				};
				return PoolAsset;
			})();
			v1beta1.Msg = (function() {
				function Msg(rpcImpl, requestDelimited, responseDelimited) {
					protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
				}
				(Msg.prototype = Object.create(protobuf.rpc.Service.prototype)).constructor = Msg;
				Msg.create = function create(rpcImpl, requestDelimited, responseDelimited) {
					return new this(rpcImpl, requestDelimited, responseDelimited);
				};
				Object.defineProperty(
					(Msg.prototype.joinPool = function joinPool(request, callback) {
						return this.rpcCall(
							joinPool,
							osmosis.gamm.v1beta1.MsgJoinPool,
							osmosis.gamm.v1beta1.MsgJoinPoolResponse,
							request,
							callback
						);
					}),
					'name',
					{ value: 'JoinPool' }
				);
				Object.defineProperty(
					(Msg.prototype.exitPool = function exitPool(request, callback) {
						return this.rpcCall(
							exitPool,
							osmosis.gamm.v1beta1.MsgExitPool,
							osmosis.gamm.v1beta1.MsgExitPoolResponse,
							request,
							callback
						);
					}),
					'name',
					{ value: 'ExitPool' }
				);
				Object.defineProperty(
					(Msg.prototype.swapExactAmountIn = function swapExactAmountIn(request, callback) {
						return this.rpcCall(
							swapExactAmountIn,
							osmosis.gamm.v1beta1.MsgSwapExactAmountIn,
							osmosis.gamm.v1beta1.MsgSwapExactAmountInResponse,
							request,
							callback
						);
					}),
					'name',
					{ value: 'SwapExactAmountIn' }
				);
				Object.defineProperty(
					(Msg.prototype.swapExactAmountOut = function swapExactAmountOut(request, callback) {
						return this.rpcCall(
							swapExactAmountOut,
							osmosis.gamm.v1beta1.MsgSwapExactAmountOut,
							osmosis.gamm.v1beta1.MsgSwapExactAmountOutResponse,
							request,
							callback
						);
					}),
					'name',
					{ value: 'SwapExactAmountOut' }
				);
				Object.defineProperty(
					(Msg.prototype.joinSwapExternAmountIn = function joinSwapExternAmountIn(request, callback) {
						return this.rpcCall(
							joinSwapExternAmountIn,
							osmosis.gamm.v1beta1.MsgJoinSwapExternAmountIn,
							osmosis.gamm.v1beta1.MsgJoinSwapExternAmountInResponse,
							request,
							callback
						);
					}),
					'name',
					{ value: 'JoinSwapExternAmountIn' }
				);
				Object.defineProperty(
					(Msg.prototype.joinSwapShareAmountOut = function joinSwapShareAmountOut(request, callback) {
						return this.rpcCall(
							joinSwapShareAmountOut,
							osmosis.gamm.v1beta1.MsgJoinSwapShareAmountOut,
							osmosis.gamm.v1beta1.MsgJoinSwapShareAmountOutResponse,
							request,
							callback
						);
					}),
					'name',
					{ value: 'JoinSwapShareAmountOut' }
				);
				Object.defineProperty(
					(Msg.prototype.exitSwapExternAmountOut = function exitSwapExternAmountOut(request, callback) {
						return this.rpcCall(
							exitSwapExternAmountOut,
							osmosis.gamm.v1beta1.MsgExitSwapExternAmountOut,
							osmosis.gamm.v1beta1.MsgExitSwapExternAmountOutResponse,
							request,
							callback
						);
					}),
					'name',
					{ value: 'ExitSwapExternAmountOut' }
				);
				Object.defineProperty(
					(Msg.prototype.exitSwapShareAmountIn = function exitSwapShareAmountIn(request, callback) {
						return this.rpcCall(
							exitSwapShareAmountIn,
							osmosis.gamm.v1beta1.MsgExitSwapShareAmountIn,
							osmosis.gamm.v1beta1.MsgExitSwapShareAmountInResponse,
							request,
							callback
						);
					}),
					'name',
					{ value: 'ExitSwapShareAmountIn' }
				);
				return Msg;
			})();
			v1beta1.MsgCreateBalancerPool = (function() {
				function MsgCreateBalancerPool(p) {
					this.pool_assets = [];
					if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
				}
				MsgCreateBalancerPool.prototype.sender = '';
				MsgCreateBalancerPool.prototype.pool_params = null;
				MsgCreateBalancerPool.prototype.pool_assets = $util.emptyArray;
				MsgCreateBalancerPool.prototype.future_pool_governor = '';
				MsgCreateBalancerPool.create = function create(properties) {
					return new MsgCreateBalancerPool(properties);
				};
				MsgCreateBalancerPool.encode = function encode(m, w) {
					if (!w) w = $Writer.create();
					if (m.sender != null && Object.hasOwnProperty.call(m, 'sender')) w.uint32(10).string(m.sender);
					if (m.pool_params != null && Object.hasOwnProperty.call(m, 'pool_params'))
						osmosis.gamm.v1beta1.PoolParams.encode(m.pool_params, w.uint32(18).fork()).ldelim();
					if (m.pool_assets != null && m.pool_assets.length) {
						for (var i = 0; i < m.pool_assets.length; ++i)
							osmosis.gamm.v1beta1.PoolAsset.encode(m.pool_assets[i], w.uint32(26).fork()).ldelim();
					}
					if (m.future_pool_governor != null && Object.hasOwnProperty.call(m, 'future_pool_governor'))
						w.uint32(34).string(m.future_pool_governor);
					return w;
				};
				MsgCreateBalancerPool.decode = function decode(r, l) {
					if (!(r instanceof $Reader)) r = $Reader.create(r);
					var c = l === undefined ? r.len : r.pos + l,
						m = new osmosis.gamm.v1beta1.MsgCreateBalancerPool();
					while (r.pos < c) {
						var t = r.uint32();
						switch (t >>> 3) {
							case 1:
								m.sender = r.string();
								break;
							case 2:
								m.pool_params = osmosis.gamm.v1beta1.PoolParams.decode(r, r.uint32());
								break;
							case 3:
								if (!(m.pool_assets && m.pool_assets.length)) m.pool_assets = [];
								m.pool_assets.push(osmosis.gamm.v1beta1.PoolAsset.decode(r, r.uint32()));
								break;
							case 4:
								m.future_pool_governor = r.string();
								break;
							default:
								r.skipType(t & 7);
								break;
						}
					}
					return m;
				};
				MsgCreateBalancerPool.fromObject = function fromObject(d) {
					if (d instanceof osmosis.gamm.v1beta1.MsgCreateBalancerPool) return d;
					var m = new osmosis.gamm.v1beta1.MsgCreateBalancerPool();
					if (d.sender != null) {
						m.sender = String(d.sender);
					}
					if (d.pool_params != null) {
						if (typeof d.pool_params !== 'object')
							throw TypeError('.osmosis.gamm.v1beta1.MsgCreateBalancerPool.pool_params: object expected');
						m.pool_params = osmosis.gamm.v1beta1.PoolParams.fromObject(d.pool_params);
					}
					if (d.pool_assets) {
						if (!Array.isArray(d.pool_assets))
							throw TypeError('.osmosis.gamm.v1beta1.MsgCreateBalancerPool.pool_assets: array expected');
						m.pool_assets = [];
						for (var i = 0; i < d.pool_assets.length; ++i) {
							if (typeof d.pool_assets[i] !== 'object')
								throw TypeError('.osmosis.gamm.v1beta1.MsgCreateBalancerPool.pool_assets: object expected');
							m.pool_assets[i] = osmosis.gamm.v1beta1.PoolAsset.fromObject(d.pool_assets[i]);
						}
					}
					if (d.future_pool_governor != null) {
						m.future_pool_governor = String(d.future_pool_governor);
					}
					return m;
				};
				MsgCreateBalancerPool.toObject = function toObject(m, o) {
					if (!o) o = {};
					var d = {};
					if (o.arrays || o.defaults) {
						d.pool_assets = [];
					}
					if (o.defaults) {
						d.sender = '';
						d.pool_params = null;
						d.future_pool_governor = '';
					}
					if (m.sender != null && m.hasOwnProperty('sender')) {
						d.sender = m.sender;
					}
					if (m.pool_params != null && m.hasOwnProperty('pool_params')) {
						d.pool_params = osmosis.gamm.v1beta1.PoolParams.toObject(m.pool_params, o);
					}
					if (m.pool_assets && m.pool_assets.length) {
						d.pool_assets = [];
						for (var j = 0; j < m.pool_assets.length; ++j) {
							d.pool_assets[j] = osmosis.gamm.v1beta1.PoolAsset.toObject(m.pool_assets[j], o);
						}
					}
					if (m.future_pool_governor != null && m.hasOwnProperty('future_pool_governor')) {
						d.future_pool_governor = m.future_pool_governor;
					}
					return d;
				};
				MsgCreateBalancerPool.prototype.toJSON = function toJSON() {
					return this.constructor.toObject(this, protobuf.util.toJSONOptions);
				};
				return MsgCreateBalancerPool;
			})();
			v1beta1.MsgCreateBalancerPoolResponse = (function() {
				function MsgCreateBalancerPoolResponse(p) {
					if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
				}
				MsgCreateBalancerPoolResponse.create = function create(properties) {
					return new MsgCreateBalancerPoolResponse(properties);
				};
				MsgCreateBalancerPoolResponse.encode = function encode(m, w) {
					if (!w) w = $Writer.create();
					return w;
				};
				MsgCreateBalancerPoolResponse.decode = function decode(r, l) {
					if (!(r instanceof $Reader)) r = $Reader.create(r);
					var c = l === undefined ? r.len : r.pos + l,
						m = new osmosis.gamm.v1beta1.MsgCreateBalancerPoolResponse();
					while (r.pos < c) {
						var t = r.uint32();
						switch (t >>> 3) {
							default:
								r.skipType(t & 7);
								break;
						}
					}
					return m;
				};
				MsgCreateBalancerPoolResponse.fromObject = function fromObject(d) {
					if (d instanceof osmosis.gamm.v1beta1.MsgCreateBalancerPoolResponse) return d;
					return new osmosis.gamm.v1beta1.MsgCreateBalancerPoolResponse();
				};
				MsgCreateBalancerPoolResponse.toObject = function toObject() {
					return {};
				};
				MsgCreateBalancerPoolResponse.prototype.toJSON = function toJSON() {
					return this.constructor.toObject(this, protobuf.util.toJSONOptions);
				};
				return MsgCreateBalancerPoolResponse;
			})();
			v1beta1.MsgJoinPool = (function() {
				function MsgJoinPool(p) {
					this.tokenInMaxs = [];
					if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
				}
				MsgJoinPool.prototype.sender = '';
				MsgJoinPool.prototype.poolId = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
				MsgJoinPool.prototype.shareOutAmount = '';
				MsgJoinPool.prototype.tokenInMaxs = $util.emptyArray;
				MsgJoinPool.create = function create(properties) {
					return new MsgJoinPool(properties);
				};
				MsgJoinPool.encode = function encode(m, w) {
					if (!w) w = $Writer.create();
					if (m.sender != null && Object.hasOwnProperty.call(m, 'sender')) w.uint32(10).string(m.sender);
					if (m.poolId != null && Object.hasOwnProperty.call(m, 'poolId')) w.uint32(16).uint64(m.poolId);
					if (m.shareOutAmount != null && Object.hasOwnProperty.call(m, 'shareOutAmount'))
						w.uint32(26).string(m.shareOutAmount);
					if (m.tokenInMaxs != null && m.tokenInMaxs.length) {
						for (var i = 0; i < m.tokenInMaxs.length; ++i)
							cosmos.base.v1beta1.Coin.encode(m.tokenInMaxs[i], w.uint32(34).fork()).ldelim();
					}
					return w;
				};
				MsgJoinPool.decode = function decode(r, l) {
					if (!(r instanceof $Reader)) r = $Reader.create(r);
					var c = l === undefined ? r.len : r.pos + l,
						m = new osmosis.gamm.v1beta1.MsgJoinPool();
					while (r.pos < c) {
						var t = r.uint32();
						switch (t >>> 3) {
							case 1:
								m.sender = r.string();
								break;
							case 2:
								m.poolId = r.uint64();
								break;
							case 3:
								m.shareOutAmount = r.string();
								break;
							case 4:
								if (!(m.tokenInMaxs && m.tokenInMaxs.length)) m.tokenInMaxs = [];
								m.tokenInMaxs.push(cosmos.base.v1beta1.Coin.decode(r, r.uint32()));
								break;
							default:
								r.skipType(t & 7);
								break;
						}
					}
					return m;
				};
				MsgJoinPool.fromObject = function fromObject(d) {
					if (d instanceof osmosis.gamm.v1beta1.MsgJoinPool) return d;
					var m = new osmosis.gamm.v1beta1.MsgJoinPool();
					if (d.sender != null) {
						m.sender = String(d.sender);
					}
					if (d.poolId != null) {
						if ($util.Long) (m.poolId = $util.Long.fromValue(d.poolId)).unsigned = true;
						else if (typeof d.poolId === 'string') m.poolId = parseInt(d.poolId, 10);
						else if (typeof d.poolId === 'number') m.poolId = d.poolId;
						else if (typeof d.poolId === 'object')
							m.poolId = new $util.LongBits(d.poolId.low >>> 0, d.poolId.high >>> 0).toNumber(true);
					}
					if (d.shareOutAmount != null) {
						m.shareOutAmount = String(d.shareOutAmount);
					}
					if (d.tokenInMaxs) {
						if (!Array.isArray(d.tokenInMaxs))
							throw TypeError('.osmosis.gamm.v1beta1.MsgJoinPool.tokenInMaxs: array expected');
						m.tokenInMaxs = [];
						for (var i = 0; i < d.tokenInMaxs.length; ++i) {
							if (typeof d.tokenInMaxs[i] !== 'object')
								throw TypeError('.osmosis.gamm.v1beta1.MsgJoinPool.tokenInMaxs: object expected');
							m.tokenInMaxs[i] = cosmos.base.v1beta1.Coin.fromObject(d.tokenInMaxs[i]);
						}
					}
					return m;
				};
				MsgJoinPool.toObject = function toObject(m, o) {
					if (!o) o = {};
					var d = {};
					if (o.arrays || o.defaults) {
						d.tokenInMaxs = [];
					}
					if (o.defaults) {
						d.sender = '';
						if ($util.Long) {
							var n = new $util.Long(0, 0, true);
							d.poolId = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
						} else d.poolId = o.longs === String ? '0' : 0;
						d.shareOutAmount = '';
					}
					if (m.sender != null && m.hasOwnProperty('sender')) {
						d.sender = m.sender;
					}
					if (m.poolId != null && m.hasOwnProperty('poolId')) {
						if (typeof m.poolId === 'number') d.poolId = o.longs === String ? String(m.poolId) : m.poolId;
						else
							d.poolId =
								o.longs === String
									? $util.Long.prototype.toString.call(m.poolId)
									: o.longs === Number
									? new $util.LongBits(m.poolId.low >>> 0, m.poolId.high >>> 0).toNumber(true)
									: m.poolId;
					}
					if (m.shareOutAmount != null && m.hasOwnProperty('shareOutAmount')) {
						d.shareOutAmount = m.shareOutAmount;
					}
					if (m.tokenInMaxs && m.tokenInMaxs.length) {
						d.tokenInMaxs = [];
						for (var j = 0; j < m.tokenInMaxs.length; ++j) {
							d.tokenInMaxs[j] = cosmos.base.v1beta1.Coin.toObject(m.tokenInMaxs[j], o);
						}
					}
					return d;
				};
				MsgJoinPool.prototype.toJSON = function toJSON() {
					return this.constructor.toObject(this, protobuf.util.toJSONOptions);
				};
				return MsgJoinPool;
			})();
			v1beta1.MsgJoinPoolResponse = (function() {
				function MsgJoinPoolResponse(p) {
					if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
				}
				MsgJoinPoolResponse.create = function create(properties) {
					return new MsgJoinPoolResponse(properties);
				};
				MsgJoinPoolResponse.encode = function encode(m, w) {
					if (!w) w = $Writer.create();
					return w;
				};
				MsgJoinPoolResponse.decode = function decode(r, l) {
					if (!(r instanceof $Reader)) r = $Reader.create(r);
					var c = l === undefined ? r.len : r.pos + l,
						m = new osmosis.gamm.v1beta1.MsgJoinPoolResponse();
					while (r.pos < c) {
						var t = r.uint32();
						switch (t >>> 3) {
							default:
								r.skipType(t & 7);
								break;
						}
					}
					return m;
				};
				MsgJoinPoolResponse.fromObject = function fromObject(d) {
					if (d instanceof osmosis.gamm.v1beta1.MsgJoinPoolResponse) return d;
					return new osmosis.gamm.v1beta1.MsgJoinPoolResponse();
				};
				MsgJoinPoolResponse.toObject = function toObject() {
					return {};
				};
				MsgJoinPoolResponse.prototype.toJSON = function toJSON() {
					return this.constructor.toObject(this, protobuf.util.toJSONOptions);
				};
				return MsgJoinPoolResponse;
			})();
			v1beta1.MsgExitPool = (function() {
				function MsgExitPool(p) {
					this.tokenOutMins = [];
					if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
				}
				MsgExitPool.prototype.sender = '';
				MsgExitPool.prototype.poolId = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
				MsgExitPool.prototype.shareInAmount = '';
				MsgExitPool.prototype.tokenOutMins = $util.emptyArray;
				MsgExitPool.create = function create(properties) {
					return new MsgExitPool(properties);
				};
				MsgExitPool.encode = function encode(m, w) {
					if (!w) w = $Writer.create();
					if (m.sender != null && Object.hasOwnProperty.call(m, 'sender')) w.uint32(10).string(m.sender);
					if (m.poolId != null && Object.hasOwnProperty.call(m, 'poolId')) w.uint32(16).uint64(m.poolId);
					if (m.shareInAmount != null && Object.hasOwnProperty.call(m, 'shareInAmount'))
						w.uint32(26).string(m.shareInAmount);
					if (m.tokenOutMins != null && m.tokenOutMins.length) {
						for (var i = 0; i < m.tokenOutMins.length; ++i)
							cosmos.base.v1beta1.Coin.encode(m.tokenOutMins[i], w.uint32(34).fork()).ldelim();
					}
					return w;
				};
				MsgExitPool.decode = function decode(r, l) {
					if (!(r instanceof $Reader)) r = $Reader.create(r);
					var c = l === undefined ? r.len : r.pos + l,
						m = new osmosis.gamm.v1beta1.MsgExitPool();
					while (r.pos < c) {
						var t = r.uint32();
						switch (t >>> 3) {
							case 1:
								m.sender = r.string();
								break;
							case 2:
								m.poolId = r.uint64();
								break;
							case 3:
								m.shareInAmount = r.string();
								break;
							case 4:
								if (!(m.tokenOutMins && m.tokenOutMins.length)) m.tokenOutMins = [];
								m.tokenOutMins.push(cosmos.base.v1beta1.Coin.decode(r, r.uint32()));
								break;
							default:
								r.skipType(t & 7);
								break;
						}
					}
					return m;
				};
				MsgExitPool.fromObject = function fromObject(d) {
					if (d instanceof osmosis.gamm.v1beta1.MsgExitPool) return d;
					var m = new osmosis.gamm.v1beta1.MsgExitPool();
					if (d.sender != null) {
						m.sender = String(d.sender);
					}
					if (d.poolId != null) {
						if ($util.Long) (m.poolId = $util.Long.fromValue(d.poolId)).unsigned = true;
						else if (typeof d.poolId === 'string') m.poolId = parseInt(d.poolId, 10);
						else if (typeof d.poolId === 'number') m.poolId = d.poolId;
						else if (typeof d.poolId === 'object')
							m.poolId = new $util.LongBits(d.poolId.low >>> 0, d.poolId.high >>> 0).toNumber(true);
					}
					if (d.shareInAmount != null) {
						m.shareInAmount = String(d.shareInAmount);
					}
					if (d.tokenOutMins) {
						if (!Array.isArray(d.tokenOutMins))
							throw TypeError('.osmosis.gamm.v1beta1.MsgExitPool.tokenOutMins: array expected');
						m.tokenOutMins = [];
						for (var i = 0; i < d.tokenOutMins.length; ++i) {
							if (typeof d.tokenOutMins[i] !== 'object')
								throw TypeError('.osmosis.gamm.v1beta1.MsgExitPool.tokenOutMins: object expected');
							m.tokenOutMins[i] = cosmos.base.v1beta1.Coin.fromObject(d.tokenOutMins[i]);
						}
					}
					return m;
				};
				MsgExitPool.toObject = function toObject(m, o) {
					if (!o) o = {};
					var d = {};
					if (o.arrays || o.defaults) {
						d.tokenOutMins = [];
					}
					if (o.defaults) {
						d.sender = '';
						if ($util.Long) {
							var n = new $util.Long(0, 0, true);
							d.poolId = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
						} else d.poolId = o.longs === String ? '0' : 0;
						d.shareInAmount = '';
					}
					if (m.sender != null && m.hasOwnProperty('sender')) {
						d.sender = m.sender;
					}
					if (m.poolId != null && m.hasOwnProperty('poolId')) {
						if (typeof m.poolId === 'number') d.poolId = o.longs === String ? String(m.poolId) : m.poolId;
						else
							d.poolId =
								o.longs === String
									? $util.Long.prototype.toString.call(m.poolId)
									: o.longs === Number
									? new $util.LongBits(m.poolId.low >>> 0, m.poolId.high >>> 0).toNumber(true)
									: m.poolId;
					}
					if (m.shareInAmount != null && m.hasOwnProperty('shareInAmount')) {
						d.shareInAmount = m.shareInAmount;
					}
					if (m.tokenOutMins && m.tokenOutMins.length) {
						d.tokenOutMins = [];
						for (var j = 0; j < m.tokenOutMins.length; ++j) {
							d.tokenOutMins[j] = cosmos.base.v1beta1.Coin.toObject(m.tokenOutMins[j], o);
						}
					}
					return d;
				};
				MsgExitPool.prototype.toJSON = function toJSON() {
					return this.constructor.toObject(this, protobuf.util.toJSONOptions);
				};
				return MsgExitPool;
			})();
			v1beta1.MsgExitPoolResponse = (function() {
				function MsgExitPoolResponse(p) {
					if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
				}
				MsgExitPoolResponse.create = function create(properties) {
					return new MsgExitPoolResponse(properties);
				};
				MsgExitPoolResponse.encode = function encode(m, w) {
					if (!w) w = $Writer.create();
					return w;
				};
				MsgExitPoolResponse.decode = function decode(r, l) {
					if (!(r instanceof $Reader)) r = $Reader.create(r);
					var c = l === undefined ? r.len : r.pos + l,
						m = new osmosis.gamm.v1beta1.MsgExitPoolResponse();
					while (r.pos < c) {
						var t = r.uint32();
						switch (t >>> 3) {
							default:
								r.skipType(t & 7);
								break;
						}
					}
					return m;
				};
				MsgExitPoolResponse.fromObject = function fromObject(d) {
					if (d instanceof osmosis.gamm.v1beta1.MsgExitPoolResponse) return d;
					return new osmosis.gamm.v1beta1.MsgExitPoolResponse();
				};
				MsgExitPoolResponse.toObject = function toObject() {
					return {};
				};
				MsgExitPoolResponse.prototype.toJSON = function toJSON() {
					return this.constructor.toObject(this, protobuf.util.toJSONOptions);
				};
				return MsgExitPoolResponse;
			})();
			v1beta1.SwapAmountInRoute = (function() {
				function SwapAmountInRoute(p) {
					if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
				}
				SwapAmountInRoute.prototype.poolId = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
				SwapAmountInRoute.prototype.tokenOutDenom = '';
				SwapAmountInRoute.create = function create(properties) {
					return new SwapAmountInRoute(properties);
				};
				SwapAmountInRoute.encode = function encode(m, w) {
					if (!w) w = $Writer.create();
					if (m.poolId != null && Object.hasOwnProperty.call(m, 'poolId')) w.uint32(8).uint64(m.poolId);
					if (m.tokenOutDenom != null && Object.hasOwnProperty.call(m, 'tokenOutDenom'))
						w.uint32(18).string(m.tokenOutDenom);
					return w;
				};
				SwapAmountInRoute.decode = function decode(r, l) {
					if (!(r instanceof $Reader)) r = $Reader.create(r);
					var c = l === undefined ? r.len : r.pos + l,
						m = new osmosis.gamm.v1beta1.SwapAmountInRoute();
					while (r.pos < c) {
						var t = r.uint32();
						switch (t >>> 3) {
							case 1:
								m.poolId = r.uint64();
								break;
							case 2:
								m.tokenOutDenom = r.string();
								break;
							default:
								r.skipType(t & 7);
								break;
						}
					}
					return m;
				};
				SwapAmountInRoute.fromObject = function fromObject(d) {
					if (d instanceof osmosis.gamm.v1beta1.SwapAmountInRoute) return d;
					var m = new osmosis.gamm.v1beta1.SwapAmountInRoute();
					if (d.poolId != null) {
						if ($util.Long) (m.poolId = $util.Long.fromValue(d.poolId)).unsigned = true;
						else if (typeof d.poolId === 'string') m.poolId = parseInt(d.poolId, 10);
						else if (typeof d.poolId === 'number') m.poolId = d.poolId;
						else if (typeof d.poolId === 'object')
							m.poolId = new $util.LongBits(d.poolId.low >>> 0, d.poolId.high >>> 0).toNumber(true);
					}
					if (d.tokenOutDenom != null) {
						m.tokenOutDenom = String(d.tokenOutDenom);
					}
					return m;
				};
				SwapAmountInRoute.toObject = function toObject(m, o) {
					if (!o) o = {};
					var d = {};
					if (o.defaults) {
						if ($util.Long) {
							var n = new $util.Long(0, 0, true);
							d.poolId = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
						} else d.poolId = o.longs === String ? '0' : 0;
						d.tokenOutDenom = '';
					}
					if (m.poolId != null && m.hasOwnProperty('poolId')) {
						if (typeof m.poolId === 'number') d.poolId = o.longs === String ? String(m.poolId) : m.poolId;
						else
							d.poolId =
								o.longs === String
									? $util.Long.prototype.toString.call(m.poolId)
									: o.longs === Number
									? new $util.LongBits(m.poolId.low >>> 0, m.poolId.high >>> 0).toNumber(true)
									: m.poolId;
					}
					if (m.tokenOutDenom != null && m.hasOwnProperty('tokenOutDenom')) {
						d.tokenOutDenom = m.tokenOutDenom;
					}
					return d;
				};
				SwapAmountInRoute.prototype.toJSON = function toJSON() {
					return this.constructor.toObject(this, protobuf.util.toJSONOptions);
				};
				return SwapAmountInRoute;
			})();
			v1beta1.MsgSwapExactAmountIn = (function() {
				function MsgSwapExactAmountIn(p) {
					this.routes = [];
					if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
				}
				MsgSwapExactAmountIn.prototype.sender = '';
				MsgSwapExactAmountIn.prototype.routes = $util.emptyArray;
				MsgSwapExactAmountIn.prototype.tokenIn = null;
				MsgSwapExactAmountIn.prototype.tokenOutMinAmount = '';
				MsgSwapExactAmountIn.create = function create(properties) {
					return new MsgSwapExactAmountIn(properties);
				};
				MsgSwapExactAmountIn.encode = function encode(m, w) {
					if (!w) w = $Writer.create();
					if (m.sender != null && Object.hasOwnProperty.call(m, 'sender')) w.uint32(10).string(m.sender);
					if (m.routes != null && m.routes.length) {
						for (var i = 0; i < m.routes.length; ++i)
							osmosis.gamm.v1beta1.SwapAmountInRoute.encode(m.routes[i], w.uint32(18).fork()).ldelim();
					}
					if (m.tokenIn != null && Object.hasOwnProperty.call(m, 'tokenIn'))
						cosmos.base.v1beta1.Coin.encode(m.tokenIn, w.uint32(26).fork()).ldelim();
					if (m.tokenOutMinAmount != null && Object.hasOwnProperty.call(m, 'tokenOutMinAmount'))
						w.uint32(34).string(m.tokenOutMinAmount);
					return w;
				};
				MsgSwapExactAmountIn.decode = function decode(r, l) {
					if (!(r instanceof $Reader)) r = $Reader.create(r);
					var c = l === undefined ? r.len : r.pos + l,
						m = new osmosis.gamm.v1beta1.MsgSwapExactAmountIn();
					while (r.pos < c) {
						var t = r.uint32();
						switch (t >>> 3) {
							case 1:
								m.sender = r.string();
								break;
							case 2:
								if (!(m.routes && m.routes.length)) m.routes = [];
								m.routes.push(osmosis.gamm.v1beta1.SwapAmountInRoute.decode(r, r.uint32()));
								break;
							case 3:
								m.tokenIn = cosmos.base.v1beta1.Coin.decode(r, r.uint32());
								break;
							case 4:
								m.tokenOutMinAmount = r.string();
								break;
							default:
								r.skipType(t & 7);
								break;
						}
					}
					return m;
				};
				MsgSwapExactAmountIn.fromObject = function fromObject(d) {
					if (d instanceof osmosis.gamm.v1beta1.MsgSwapExactAmountIn) return d;
					var m = new osmosis.gamm.v1beta1.MsgSwapExactAmountIn();
					if (d.sender != null) {
						m.sender = String(d.sender);
					}
					if (d.routes) {
						if (!Array.isArray(d.routes))
							throw TypeError('.osmosis.gamm.v1beta1.MsgSwapExactAmountIn.routes: array expected');
						m.routes = [];
						for (var i = 0; i < d.routes.length; ++i) {
							if (typeof d.routes[i] !== 'object')
								throw TypeError('.osmosis.gamm.v1beta1.MsgSwapExactAmountIn.routes: object expected');
							m.routes[i] = osmosis.gamm.v1beta1.SwapAmountInRoute.fromObject(d.routes[i]);
						}
					}
					if (d.tokenIn != null) {
						if (typeof d.tokenIn !== 'object')
							throw TypeError('.osmosis.gamm.v1beta1.MsgSwapExactAmountIn.tokenIn: object expected');
						m.tokenIn = cosmos.base.v1beta1.Coin.fromObject(d.tokenIn);
					}
					if (d.tokenOutMinAmount != null) {
						m.tokenOutMinAmount = String(d.tokenOutMinAmount);
					}
					return m;
				};
				MsgSwapExactAmountIn.toObject = function toObject(m, o) {
					if (!o) o = {};
					var d = {};
					if (o.arrays || o.defaults) {
						d.routes = [];
					}
					if (o.defaults) {
						d.sender = '';
						d.tokenIn = null;
						d.tokenOutMinAmount = '';
					}
					if (m.sender != null && m.hasOwnProperty('sender')) {
						d.sender = m.sender;
					}
					if (m.routes && m.routes.length) {
						d.routes = [];
						for (var j = 0; j < m.routes.length; ++j) {
							d.routes[j] = osmosis.gamm.v1beta1.SwapAmountInRoute.toObject(m.routes[j], o);
						}
					}
					if (m.tokenIn != null && m.hasOwnProperty('tokenIn')) {
						d.tokenIn = cosmos.base.v1beta1.Coin.toObject(m.tokenIn, o);
					}
					if (m.tokenOutMinAmount != null && m.hasOwnProperty('tokenOutMinAmount')) {
						d.tokenOutMinAmount = m.tokenOutMinAmount;
					}
					return d;
				};
				MsgSwapExactAmountIn.prototype.toJSON = function toJSON() {
					return this.constructor.toObject(this, protobuf.util.toJSONOptions);
				};
				return MsgSwapExactAmountIn;
			})();
			v1beta1.MsgSwapExactAmountInResponse = (function() {
				function MsgSwapExactAmountInResponse(p) {
					if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
				}
				MsgSwapExactAmountInResponse.create = function create(properties) {
					return new MsgSwapExactAmountInResponse(properties);
				};
				MsgSwapExactAmountInResponse.encode = function encode(m, w) {
					if (!w) w = $Writer.create();
					return w;
				};
				MsgSwapExactAmountInResponse.decode = function decode(r, l) {
					if (!(r instanceof $Reader)) r = $Reader.create(r);
					var c = l === undefined ? r.len : r.pos + l,
						m = new osmosis.gamm.v1beta1.MsgSwapExactAmountInResponse();
					while (r.pos < c) {
						var t = r.uint32();
						switch (t >>> 3) {
							default:
								r.skipType(t & 7);
								break;
						}
					}
					return m;
				};
				MsgSwapExactAmountInResponse.fromObject = function fromObject(d) {
					if (d instanceof osmosis.gamm.v1beta1.MsgSwapExactAmountInResponse) return d;
					return new osmosis.gamm.v1beta1.MsgSwapExactAmountInResponse();
				};
				MsgSwapExactAmountInResponse.toObject = function toObject() {
					return {};
				};
				MsgSwapExactAmountInResponse.prototype.toJSON = function toJSON() {
					return this.constructor.toObject(this, protobuf.util.toJSONOptions);
				};
				return MsgSwapExactAmountInResponse;
			})();
			v1beta1.SwapAmountOutRoute = (function() {
				function SwapAmountOutRoute(p) {
					if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
				}
				SwapAmountOutRoute.prototype.poolId = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
				SwapAmountOutRoute.prototype.tokenInDenom = '';
				SwapAmountOutRoute.create = function create(properties) {
					return new SwapAmountOutRoute(properties);
				};
				SwapAmountOutRoute.encode = function encode(m, w) {
					if (!w) w = $Writer.create();
					if (m.poolId != null && Object.hasOwnProperty.call(m, 'poolId')) w.uint32(8).uint64(m.poolId);
					if (m.tokenInDenom != null && Object.hasOwnProperty.call(m, 'tokenInDenom'))
						w.uint32(18).string(m.tokenInDenom);
					return w;
				};
				SwapAmountOutRoute.decode = function decode(r, l) {
					if (!(r instanceof $Reader)) r = $Reader.create(r);
					var c = l === undefined ? r.len : r.pos + l,
						m = new osmosis.gamm.v1beta1.SwapAmountOutRoute();
					while (r.pos < c) {
						var t = r.uint32();
						switch (t >>> 3) {
							case 1:
								m.poolId = r.uint64();
								break;
							case 2:
								m.tokenInDenom = r.string();
								break;
							default:
								r.skipType(t & 7);
								break;
						}
					}
					return m;
				};
				SwapAmountOutRoute.fromObject = function fromObject(d) {
					if (d instanceof osmosis.gamm.v1beta1.SwapAmountOutRoute) return d;
					var m = new osmosis.gamm.v1beta1.SwapAmountOutRoute();
					if (d.poolId != null) {
						if ($util.Long) (m.poolId = $util.Long.fromValue(d.poolId)).unsigned = true;
						else if (typeof d.poolId === 'string') m.poolId = parseInt(d.poolId, 10);
						else if (typeof d.poolId === 'number') m.poolId = d.poolId;
						else if (typeof d.poolId === 'object')
							m.poolId = new $util.LongBits(d.poolId.low >>> 0, d.poolId.high >>> 0).toNumber(true);
					}
					if (d.tokenInDenom != null) {
						m.tokenInDenom = String(d.tokenInDenom);
					}
					return m;
				};
				SwapAmountOutRoute.toObject = function toObject(m, o) {
					if (!o) o = {};
					var d = {};
					if (o.defaults) {
						if ($util.Long) {
							var n = new $util.Long(0, 0, true);
							d.poolId = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
						} else d.poolId = o.longs === String ? '0' : 0;
						d.tokenInDenom = '';
					}
					if (m.poolId != null && m.hasOwnProperty('poolId')) {
						if (typeof m.poolId === 'number') d.poolId = o.longs === String ? String(m.poolId) : m.poolId;
						else
							d.poolId =
								o.longs === String
									? $util.Long.prototype.toString.call(m.poolId)
									: o.longs === Number
									? new $util.LongBits(m.poolId.low >>> 0, m.poolId.high >>> 0).toNumber(true)
									: m.poolId;
					}
					if (m.tokenInDenom != null && m.hasOwnProperty('tokenInDenom')) {
						d.tokenInDenom = m.tokenInDenom;
					}
					return d;
				};
				SwapAmountOutRoute.prototype.toJSON = function toJSON() {
					return this.constructor.toObject(this, protobuf.util.toJSONOptions);
				};
				return SwapAmountOutRoute;
			})();
			v1beta1.MsgSwapExactAmountOut = (function() {
				function MsgSwapExactAmountOut(p) {
					this.routes = [];
					if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
				}
				MsgSwapExactAmountOut.prototype.sender = '';
				MsgSwapExactAmountOut.prototype.routes = $util.emptyArray;
				MsgSwapExactAmountOut.prototype.tokenInMaxAmount = '';
				MsgSwapExactAmountOut.prototype.tokenOut = null;
				MsgSwapExactAmountOut.create = function create(properties) {
					return new MsgSwapExactAmountOut(properties);
				};
				MsgSwapExactAmountOut.encode = function encode(m, w) {
					if (!w) w = $Writer.create();
					if (m.sender != null && Object.hasOwnProperty.call(m, 'sender')) w.uint32(10).string(m.sender);
					if (m.routes != null && m.routes.length) {
						for (var i = 0; i < m.routes.length; ++i)
							osmosis.gamm.v1beta1.SwapAmountOutRoute.encode(m.routes[i], w.uint32(18).fork()).ldelim();
					}
					if (m.tokenInMaxAmount != null && Object.hasOwnProperty.call(m, 'tokenInMaxAmount'))
						w.uint32(26).string(m.tokenInMaxAmount);
					if (m.tokenOut != null && Object.hasOwnProperty.call(m, 'tokenOut'))
						cosmos.base.v1beta1.Coin.encode(m.tokenOut, w.uint32(34).fork()).ldelim();
					return w;
				};
				MsgSwapExactAmountOut.decode = function decode(r, l) {
					if (!(r instanceof $Reader)) r = $Reader.create(r);
					var c = l === undefined ? r.len : r.pos + l,
						m = new osmosis.gamm.v1beta1.MsgSwapExactAmountOut();
					while (r.pos < c) {
						var t = r.uint32();
						switch (t >>> 3) {
							case 1:
								m.sender = r.string();
								break;
							case 2:
								if (!(m.routes && m.routes.length)) m.routes = [];
								m.routes.push(osmosis.gamm.v1beta1.SwapAmountOutRoute.decode(r, r.uint32()));
								break;
							case 3:
								m.tokenInMaxAmount = r.string();
								break;
							case 4:
								m.tokenOut = cosmos.base.v1beta1.Coin.decode(r, r.uint32());
								break;
							default:
								r.skipType(t & 7);
								break;
						}
					}
					return m;
				};
				MsgSwapExactAmountOut.fromObject = function fromObject(d) {
					if (d instanceof osmosis.gamm.v1beta1.MsgSwapExactAmountOut) return d;
					var m = new osmosis.gamm.v1beta1.MsgSwapExactAmountOut();
					if (d.sender != null) {
						m.sender = String(d.sender);
					}
					if (d.routes) {
						if (!Array.isArray(d.routes))
							throw TypeError('.osmosis.gamm.v1beta1.MsgSwapExactAmountOut.routes: array expected');
						m.routes = [];
						for (var i = 0; i < d.routes.length; ++i) {
							if (typeof d.routes[i] !== 'object')
								throw TypeError('.osmosis.gamm.v1beta1.MsgSwapExactAmountOut.routes: object expected');
							m.routes[i] = osmosis.gamm.v1beta1.SwapAmountOutRoute.fromObject(d.routes[i]);
						}
					}
					if (d.tokenInMaxAmount != null) {
						m.tokenInMaxAmount = String(d.tokenInMaxAmount);
					}
					if (d.tokenOut != null) {
						if (typeof d.tokenOut !== 'object')
							throw TypeError('.osmosis.gamm.v1beta1.MsgSwapExactAmountOut.tokenOut: object expected');
						m.tokenOut = cosmos.base.v1beta1.Coin.fromObject(d.tokenOut);
					}
					return m;
				};
				MsgSwapExactAmountOut.toObject = function toObject(m, o) {
					if (!o) o = {};
					var d = {};
					if (o.arrays || o.defaults) {
						d.routes = [];
					}
					if (o.defaults) {
						d.sender = '';
						d.tokenInMaxAmount = '';
						d.tokenOut = null;
					}
					if (m.sender != null && m.hasOwnProperty('sender')) {
						d.sender = m.sender;
					}
					if (m.routes && m.routes.length) {
						d.routes = [];
						for (var j = 0; j < m.routes.length; ++j) {
							d.routes[j] = osmosis.gamm.v1beta1.SwapAmountOutRoute.toObject(m.routes[j], o);
						}
					}
					if (m.tokenInMaxAmount != null && m.hasOwnProperty('tokenInMaxAmount')) {
						d.tokenInMaxAmount = m.tokenInMaxAmount;
					}
					if (m.tokenOut != null && m.hasOwnProperty('tokenOut')) {
						d.tokenOut = cosmos.base.v1beta1.Coin.toObject(m.tokenOut, o);
					}
					return d;
				};
				MsgSwapExactAmountOut.prototype.toJSON = function toJSON() {
					return this.constructor.toObject(this, protobuf.util.toJSONOptions);
				};
				return MsgSwapExactAmountOut;
			})();
			v1beta1.MsgSwapExactAmountOutResponse = (function() {
				function MsgSwapExactAmountOutResponse(p) {
					if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
				}
				MsgSwapExactAmountOutResponse.create = function create(properties) {
					return new MsgSwapExactAmountOutResponse(properties);
				};
				MsgSwapExactAmountOutResponse.encode = function encode(m, w) {
					if (!w) w = $Writer.create();
					return w;
				};
				MsgSwapExactAmountOutResponse.decode = function decode(r, l) {
					if (!(r instanceof $Reader)) r = $Reader.create(r);
					var c = l === undefined ? r.len : r.pos + l,
						m = new osmosis.gamm.v1beta1.MsgSwapExactAmountOutResponse();
					while (r.pos < c) {
						var t = r.uint32();
						switch (t >>> 3) {
							default:
								r.skipType(t & 7);
								break;
						}
					}
					return m;
				};
				MsgSwapExactAmountOutResponse.fromObject = function fromObject(d) {
					if (d instanceof osmosis.gamm.v1beta1.MsgSwapExactAmountOutResponse) return d;
					return new osmosis.gamm.v1beta1.MsgSwapExactAmountOutResponse();
				};
				MsgSwapExactAmountOutResponse.toObject = function toObject() {
					return {};
				};
				MsgSwapExactAmountOutResponse.prototype.toJSON = function toJSON() {
					return this.constructor.toObject(this, protobuf.util.toJSONOptions);
				};
				return MsgSwapExactAmountOutResponse;
			})();
			v1beta1.MsgJoinSwapExternAmountIn = (function() {
				function MsgJoinSwapExternAmountIn(p) {
					if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
				}
				MsgJoinSwapExternAmountIn.prototype.sender = '';
				MsgJoinSwapExternAmountIn.prototype.poolId = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
				MsgJoinSwapExternAmountIn.prototype.tokenIn = null;
				MsgJoinSwapExternAmountIn.prototype.shareOutMinAmount = '';
				MsgJoinSwapExternAmountIn.create = function create(properties) {
					return new MsgJoinSwapExternAmountIn(properties);
				};
				MsgJoinSwapExternAmountIn.encode = function encode(m, w) {
					if (!w) w = $Writer.create();
					if (m.sender != null && Object.hasOwnProperty.call(m, 'sender')) w.uint32(10).string(m.sender);
					if (m.poolId != null && Object.hasOwnProperty.call(m, 'poolId')) w.uint32(16).uint64(m.poolId);
					if (m.tokenIn != null && Object.hasOwnProperty.call(m, 'tokenIn'))
						cosmos.base.v1beta1.Coin.encode(m.tokenIn, w.uint32(26).fork()).ldelim();
					if (m.shareOutMinAmount != null && Object.hasOwnProperty.call(m, 'shareOutMinAmount'))
						w.uint32(34).string(m.shareOutMinAmount);
					return w;
				};
				MsgJoinSwapExternAmountIn.decode = function decode(r, l) {
					if (!(r instanceof $Reader)) r = $Reader.create(r);
					var c = l === undefined ? r.len : r.pos + l,
						m = new osmosis.gamm.v1beta1.MsgJoinSwapExternAmountIn();
					while (r.pos < c) {
						var t = r.uint32();
						switch (t >>> 3) {
							case 1:
								m.sender = r.string();
								break;
							case 2:
								m.poolId = r.uint64();
								break;
							case 3:
								m.tokenIn = cosmos.base.v1beta1.Coin.decode(r, r.uint32());
								break;
							case 4:
								m.shareOutMinAmount = r.string();
								break;
							default:
								r.skipType(t & 7);
								break;
						}
					}
					return m;
				};
				MsgJoinSwapExternAmountIn.fromObject = function fromObject(d) {
					if (d instanceof osmosis.gamm.v1beta1.MsgJoinSwapExternAmountIn) return d;
					var m = new osmosis.gamm.v1beta1.MsgJoinSwapExternAmountIn();
					if (d.sender != null) {
						m.sender = String(d.sender);
					}
					if (d.poolId != null) {
						if ($util.Long) (m.poolId = $util.Long.fromValue(d.poolId)).unsigned = true;
						else if (typeof d.poolId === 'string') m.poolId = parseInt(d.poolId, 10);
						else if (typeof d.poolId === 'number') m.poolId = d.poolId;
						else if (typeof d.poolId === 'object')
							m.poolId = new $util.LongBits(d.poolId.low >>> 0, d.poolId.high >>> 0).toNumber(true);
					}
					if (d.tokenIn != null) {
						if (typeof d.tokenIn !== 'object')
							throw TypeError('.osmosis.gamm.v1beta1.MsgJoinSwapExternAmountIn.tokenIn: object expected');
						m.tokenIn = cosmos.base.v1beta1.Coin.fromObject(d.tokenIn);
					}
					if (d.shareOutMinAmount != null) {
						m.shareOutMinAmount = String(d.shareOutMinAmount);
					}
					return m;
				};
				MsgJoinSwapExternAmountIn.toObject = function toObject(m, o) {
					if (!o) o = {};
					var d = {};
					if (o.defaults) {
						d.sender = '';
						if ($util.Long) {
							var n = new $util.Long(0, 0, true);
							d.poolId = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
						} else d.poolId = o.longs === String ? '0' : 0;
						d.tokenIn = null;
						d.shareOutMinAmount = '';
					}
					if (m.sender != null && m.hasOwnProperty('sender')) {
						d.sender = m.sender;
					}
					if (m.poolId != null && m.hasOwnProperty('poolId')) {
						if (typeof m.poolId === 'number') d.poolId = o.longs === String ? String(m.poolId) : m.poolId;
						else
							d.poolId =
								o.longs === String
									? $util.Long.prototype.toString.call(m.poolId)
									: o.longs === Number
									? new $util.LongBits(m.poolId.low >>> 0, m.poolId.high >>> 0).toNumber(true)
									: m.poolId;
					}
					if (m.tokenIn != null && m.hasOwnProperty('tokenIn')) {
						d.tokenIn = cosmos.base.v1beta1.Coin.toObject(m.tokenIn, o);
					}
					if (m.shareOutMinAmount != null && m.hasOwnProperty('shareOutMinAmount')) {
						d.shareOutMinAmount = m.shareOutMinAmount;
					}
					return d;
				};
				MsgJoinSwapExternAmountIn.prototype.toJSON = function toJSON() {
					return this.constructor.toObject(this, protobuf.util.toJSONOptions);
				};
				return MsgJoinSwapExternAmountIn;
			})();
			v1beta1.MsgJoinSwapExternAmountInResponse = (function() {
				function MsgJoinSwapExternAmountInResponse(p) {
					if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
				}
				MsgJoinSwapExternAmountInResponse.create = function create(properties) {
					return new MsgJoinSwapExternAmountInResponse(properties);
				};
				MsgJoinSwapExternAmountInResponse.encode = function encode(m, w) {
					if (!w) w = $Writer.create();
					return w;
				};
				MsgJoinSwapExternAmountInResponse.decode = function decode(r, l) {
					if (!(r instanceof $Reader)) r = $Reader.create(r);
					var c = l === undefined ? r.len : r.pos + l,
						m = new osmosis.gamm.v1beta1.MsgJoinSwapExternAmountInResponse();
					while (r.pos < c) {
						var t = r.uint32();
						switch (t >>> 3) {
							default:
								r.skipType(t & 7);
								break;
						}
					}
					return m;
				};
				MsgJoinSwapExternAmountInResponse.fromObject = function fromObject(d) {
					if (d instanceof osmosis.gamm.v1beta1.MsgJoinSwapExternAmountInResponse) return d;
					return new osmosis.gamm.v1beta1.MsgJoinSwapExternAmountInResponse();
				};
				MsgJoinSwapExternAmountInResponse.toObject = function toObject() {
					return {};
				};
				MsgJoinSwapExternAmountInResponse.prototype.toJSON = function toJSON() {
					return this.constructor.toObject(this, protobuf.util.toJSONOptions);
				};
				return MsgJoinSwapExternAmountInResponse;
			})();
			v1beta1.MsgJoinSwapShareAmountOut = (function() {
				function MsgJoinSwapShareAmountOut(p) {
					if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
				}
				MsgJoinSwapShareAmountOut.prototype.sender = '';
				MsgJoinSwapShareAmountOut.prototype.poolId = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
				MsgJoinSwapShareAmountOut.prototype.tokenInDenom = '';
				MsgJoinSwapShareAmountOut.prototype.shareOutAmount = '';
				MsgJoinSwapShareAmountOut.prototype.tokenInMaxAmount = '';
				MsgJoinSwapShareAmountOut.create = function create(properties) {
					return new MsgJoinSwapShareAmountOut(properties);
				};
				MsgJoinSwapShareAmountOut.encode = function encode(m, w) {
					if (!w) w = $Writer.create();
					if (m.sender != null && Object.hasOwnProperty.call(m, 'sender')) w.uint32(10).string(m.sender);
					if (m.poolId != null && Object.hasOwnProperty.call(m, 'poolId')) w.uint32(16).uint64(m.poolId);
					if (m.tokenInDenom != null && Object.hasOwnProperty.call(m, 'tokenInDenom'))
						w.uint32(26).string(m.tokenInDenom);
					if (m.shareOutAmount != null && Object.hasOwnProperty.call(m, 'shareOutAmount'))
						w.uint32(34).string(m.shareOutAmount);
					if (m.tokenInMaxAmount != null && Object.hasOwnProperty.call(m, 'tokenInMaxAmount'))
						w.uint32(42).string(m.tokenInMaxAmount);
					return w;
				};
				MsgJoinSwapShareAmountOut.decode = function decode(r, l) {
					if (!(r instanceof $Reader)) r = $Reader.create(r);
					var c = l === undefined ? r.len : r.pos + l,
						m = new osmosis.gamm.v1beta1.MsgJoinSwapShareAmountOut();
					while (r.pos < c) {
						var t = r.uint32();
						switch (t >>> 3) {
							case 1:
								m.sender = r.string();
								break;
							case 2:
								m.poolId = r.uint64();
								break;
							case 3:
								m.tokenInDenom = r.string();
								break;
							case 4:
								m.shareOutAmount = r.string();
								break;
							case 5:
								m.tokenInMaxAmount = r.string();
								break;
							default:
								r.skipType(t & 7);
								break;
						}
					}
					return m;
				};
				MsgJoinSwapShareAmountOut.fromObject = function fromObject(d) {
					if (d instanceof osmosis.gamm.v1beta1.MsgJoinSwapShareAmountOut) return d;
					var m = new osmosis.gamm.v1beta1.MsgJoinSwapShareAmountOut();
					if (d.sender != null) {
						m.sender = String(d.sender);
					}
					if (d.poolId != null) {
						if ($util.Long) (m.poolId = $util.Long.fromValue(d.poolId)).unsigned = true;
						else if (typeof d.poolId === 'string') m.poolId = parseInt(d.poolId, 10);
						else if (typeof d.poolId === 'number') m.poolId = d.poolId;
						else if (typeof d.poolId === 'object')
							m.poolId = new $util.LongBits(d.poolId.low >>> 0, d.poolId.high >>> 0).toNumber(true);
					}
					if (d.tokenInDenom != null) {
						m.tokenInDenom = String(d.tokenInDenom);
					}
					if (d.shareOutAmount != null) {
						m.shareOutAmount = String(d.shareOutAmount);
					}
					if (d.tokenInMaxAmount != null) {
						m.tokenInMaxAmount = String(d.tokenInMaxAmount);
					}
					return m;
				};
				MsgJoinSwapShareAmountOut.toObject = function toObject(m, o) {
					if (!o) o = {};
					var d = {};
					if (o.defaults) {
						d.sender = '';
						if ($util.Long) {
							var n = new $util.Long(0, 0, true);
							d.poolId = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
						} else d.poolId = o.longs === String ? '0' : 0;
						d.tokenInDenom = '';
						d.shareOutAmount = '';
						d.tokenInMaxAmount = '';
					}
					if (m.sender != null && m.hasOwnProperty('sender')) {
						d.sender = m.sender;
					}
					if (m.poolId != null && m.hasOwnProperty('poolId')) {
						if (typeof m.poolId === 'number') d.poolId = o.longs === String ? String(m.poolId) : m.poolId;
						else
							d.poolId =
								o.longs === String
									? $util.Long.prototype.toString.call(m.poolId)
									: o.longs === Number
									? new $util.LongBits(m.poolId.low >>> 0, m.poolId.high >>> 0).toNumber(true)
									: m.poolId;
					}
					if (m.tokenInDenom != null && m.hasOwnProperty('tokenInDenom')) {
						d.tokenInDenom = m.tokenInDenom;
					}
					if (m.shareOutAmount != null && m.hasOwnProperty('shareOutAmount')) {
						d.shareOutAmount = m.shareOutAmount;
					}
					if (m.tokenInMaxAmount != null && m.hasOwnProperty('tokenInMaxAmount')) {
						d.tokenInMaxAmount = m.tokenInMaxAmount;
					}
					return d;
				};
				MsgJoinSwapShareAmountOut.prototype.toJSON = function toJSON() {
					return this.constructor.toObject(this, protobuf.util.toJSONOptions);
				};
				return MsgJoinSwapShareAmountOut;
			})();
			v1beta1.MsgJoinSwapShareAmountOutResponse = (function() {
				function MsgJoinSwapShareAmountOutResponse(p) {
					if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
				}
				MsgJoinSwapShareAmountOutResponse.create = function create(properties) {
					return new MsgJoinSwapShareAmountOutResponse(properties);
				};
				MsgJoinSwapShareAmountOutResponse.encode = function encode(m, w) {
					if (!w) w = $Writer.create();
					return w;
				};
				MsgJoinSwapShareAmountOutResponse.decode = function decode(r, l) {
					if (!(r instanceof $Reader)) r = $Reader.create(r);
					var c = l === undefined ? r.len : r.pos + l,
						m = new osmosis.gamm.v1beta1.MsgJoinSwapShareAmountOutResponse();
					while (r.pos < c) {
						var t = r.uint32();
						switch (t >>> 3) {
							default:
								r.skipType(t & 7);
								break;
						}
					}
					return m;
				};
				MsgJoinSwapShareAmountOutResponse.fromObject = function fromObject(d) {
					if (d instanceof osmosis.gamm.v1beta1.MsgJoinSwapShareAmountOutResponse) return d;
					return new osmosis.gamm.v1beta1.MsgJoinSwapShareAmountOutResponse();
				};
				MsgJoinSwapShareAmountOutResponse.toObject = function toObject() {
					return {};
				};
				MsgJoinSwapShareAmountOutResponse.prototype.toJSON = function toJSON() {
					return this.constructor.toObject(this, protobuf.util.toJSONOptions);
				};
				return MsgJoinSwapShareAmountOutResponse;
			})();
			v1beta1.MsgExitSwapShareAmountIn = (function() {
				function MsgExitSwapShareAmountIn(p) {
					if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
				}
				MsgExitSwapShareAmountIn.prototype.sender = '';
				MsgExitSwapShareAmountIn.prototype.poolId = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
				MsgExitSwapShareAmountIn.prototype.tokenOutDenom = '';
				MsgExitSwapShareAmountIn.prototype.shareInAmount = '';
				MsgExitSwapShareAmountIn.prototype.tokenOutMinAmount = '';
				MsgExitSwapShareAmountIn.create = function create(properties) {
					return new MsgExitSwapShareAmountIn(properties);
				};
				MsgExitSwapShareAmountIn.encode = function encode(m, w) {
					if (!w) w = $Writer.create();
					if (m.sender != null && Object.hasOwnProperty.call(m, 'sender')) w.uint32(10).string(m.sender);
					if (m.poolId != null && Object.hasOwnProperty.call(m, 'poolId')) w.uint32(16).uint64(m.poolId);
					if (m.tokenOutDenom != null && Object.hasOwnProperty.call(m, 'tokenOutDenom'))
						w.uint32(26).string(m.tokenOutDenom);
					if (m.shareInAmount != null && Object.hasOwnProperty.call(m, 'shareInAmount'))
						w.uint32(34).string(m.shareInAmount);
					if (m.tokenOutMinAmount != null && Object.hasOwnProperty.call(m, 'tokenOutMinAmount'))
						w.uint32(42).string(m.tokenOutMinAmount);
					return w;
				};
				MsgExitSwapShareAmountIn.decode = function decode(r, l) {
					if (!(r instanceof $Reader)) r = $Reader.create(r);
					var c = l === undefined ? r.len : r.pos + l,
						m = new osmosis.gamm.v1beta1.MsgExitSwapShareAmountIn();
					while (r.pos < c) {
						var t = r.uint32();
						switch (t >>> 3) {
							case 1:
								m.sender = r.string();
								break;
							case 2:
								m.poolId = r.uint64();
								break;
							case 3:
								m.tokenOutDenom = r.string();
								break;
							case 4:
								m.shareInAmount = r.string();
								break;
							case 5:
								m.tokenOutMinAmount = r.string();
								break;
							default:
								r.skipType(t & 7);
								break;
						}
					}
					return m;
				};
				MsgExitSwapShareAmountIn.fromObject = function fromObject(d) {
					if (d instanceof osmosis.gamm.v1beta1.MsgExitSwapShareAmountIn) return d;
					var m = new osmosis.gamm.v1beta1.MsgExitSwapShareAmountIn();
					if (d.sender != null) {
						m.sender = String(d.sender);
					}
					if (d.poolId != null) {
						if ($util.Long) (m.poolId = $util.Long.fromValue(d.poolId)).unsigned = true;
						else if (typeof d.poolId === 'string') m.poolId = parseInt(d.poolId, 10);
						else if (typeof d.poolId === 'number') m.poolId = d.poolId;
						else if (typeof d.poolId === 'object')
							m.poolId = new $util.LongBits(d.poolId.low >>> 0, d.poolId.high >>> 0).toNumber(true);
					}
					if (d.tokenOutDenom != null) {
						m.tokenOutDenom = String(d.tokenOutDenom);
					}
					if (d.shareInAmount != null) {
						m.shareInAmount = String(d.shareInAmount);
					}
					if (d.tokenOutMinAmount != null) {
						m.tokenOutMinAmount = String(d.tokenOutMinAmount);
					}
					return m;
				};
				MsgExitSwapShareAmountIn.toObject = function toObject(m, o) {
					if (!o) o = {};
					var d = {};
					if (o.defaults) {
						d.sender = '';
						if ($util.Long) {
							var n = new $util.Long(0, 0, true);
							d.poolId = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
						} else d.poolId = o.longs === String ? '0' : 0;
						d.tokenOutDenom = '';
						d.shareInAmount = '';
						d.tokenOutMinAmount = '';
					}
					if (m.sender != null && m.hasOwnProperty('sender')) {
						d.sender = m.sender;
					}
					if (m.poolId != null && m.hasOwnProperty('poolId')) {
						if (typeof m.poolId === 'number') d.poolId = o.longs === String ? String(m.poolId) : m.poolId;
						else
							d.poolId =
								o.longs === String
									? $util.Long.prototype.toString.call(m.poolId)
									: o.longs === Number
									? new $util.LongBits(m.poolId.low >>> 0, m.poolId.high >>> 0).toNumber(true)
									: m.poolId;
					}
					if (m.tokenOutDenom != null && m.hasOwnProperty('tokenOutDenom')) {
						d.tokenOutDenom = m.tokenOutDenom;
					}
					if (m.shareInAmount != null && m.hasOwnProperty('shareInAmount')) {
						d.shareInAmount = m.shareInAmount;
					}
					if (m.tokenOutMinAmount != null && m.hasOwnProperty('tokenOutMinAmount')) {
						d.tokenOutMinAmount = m.tokenOutMinAmount;
					}
					return d;
				};
				MsgExitSwapShareAmountIn.prototype.toJSON = function toJSON() {
					return this.constructor.toObject(this, protobuf.util.toJSONOptions);
				};
				return MsgExitSwapShareAmountIn;
			})();
			v1beta1.MsgExitSwapShareAmountInResponse = (function() {
				function MsgExitSwapShareAmountInResponse(p) {
					if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
				}
				MsgExitSwapShareAmountInResponse.create = function create(properties) {
					return new MsgExitSwapShareAmountInResponse(properties);
				};
				MsgExitSwapShareAmountInResponse.encode = function encode(m, w) {
					if (!w) w = $Writer.create();
					return w;
				};
				MsgExitSwapShareAmountInResponse.decode = function decode(r, l) {
					if (!(r instanceof $Reader)) r = $Reader.create(r);
					var c = l === undefined ? r.len : r.pos + l,
						m = new osmosis.gamm.v1beta1.MsgExitSwapShareAmountInResponse();
					while (r.pos < c) {
						var t = r.uint32();
						switch (t >>> 3) {
							default:
								r.skipType(t & 7);
								break;
						}
					}
					return m;
				};
				MsgExitSwapShareAmountInResponse.fromObject = function fromObject(d) {
					if (d instanceof osmosis.gamm.v1beta1.MsgExitSwapShareAmountInResponse) return d;
					return new osmosis.gamm.v1beta1.MsgExitSwapShareAmountInResponse();
				};
				MsgExitSwapShareAmountInResponse.toObject = function toObject() {
					return {};
				};
				MsgExitSwapShareAmountInResponse.prototype.toJSON = function toJSON() {
					return this.constructor.toObject(this, protobuf.util.toJSONOptions);
				};
				return MsgExitSwapShareAmountInResponse;
			})();
			v1beta1.MsgExitSwapExternAmountOut = (function() {
				function MsgExitSwapExternAmountOut(p) {
					if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
				}
				MsgExitSwapExternAmountOut.prototype.sender = '';
				MsgExitSwapExternAmountOut.prototype.poolId = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
				MsgExitSwapExternAmountOut.prototype.tokenOut = null;
				MsgExitSwapExternAmountOut.prototype.shareInMaxAmount = '';
				MsgExitSwapExternAmountOut.create = function create(properties) {
					return new MsgExitSwapExternAmountOut(properties);
				};
				MsgExitSwapExternAmountOut.encode = function encode(m, w) {
					if (!w) w = $Writer.create();
					if (m.sender != null && Object.hasOwnProperty.call(m, 'sender')) w.uint32(10).string(m.sender);
					if (m.poolId != null && Object.hasOwnProperty.call(m, 'poolId')) w.uint32(16).uint64(m.poolId);
					if (m.tokenOut != null && Object.hasOwnProperty.call(m, 'tokenOut'))
						cosmos.base.v1beta1.Coin.encode(m.tokenOut, w.uint32(26).fork()).ldelim();
					if (m.shareInMaxAmount != null && Object.hasOwnProperty.call(m, 'shareInMaxAmount'))
						w.uint32(34).string(m.shareInMaxAmount);
					return w;
				};
				MsgExitSwapExternAmountOut.decode = function decode(r, l) {
					if (!(r instanceof $Reader)) r = $Reader.create(r);
					var c = l === undefined ? r.len : r.pos + l,
						m = new osmosis.gamm.v1beta1.MsgExitSwapExternAmountOut();
					while (r.pos < c) {
						var t = r.uint32();
						switch (t >>> 3) {
							case 1:
								m.sender = r.string();
								break;
							case 2:
								m.poolId = r.uint64();
								break;
							case 3:
								m.tokenOut = cosmos.base.v1beta1.Coin.decode(r, r.uint32());
								break;
							case 4:
								m.shareInMaxAmount = r.string();
								break;
							default:
								r.skipType(t & 7);
								break;
						}
					}
					return m;
				};
				MsgExitSwapExternAmountOut.fromObject = function fromObject(d) {
					if (d instanceof osmosis.gamm.v1beta1.MsgExitSwapExternAmountOut) return d;
					var m = new osmosis.gamm.v1beta1.MsgExitSwapExternAmountOut();
					if (d.sender != null) {
						m.sender = String(d.sender);
					}
					if (d.poolId != null) {
						if ($util.Long) (m.poolId = $util.Long.fromValue(d.poolId)).unsigned = true;
						else if (typeof d.poolId === 'string') m.poolId = parseInt(d.poolId, 10);
						else if (typeof d.poolId === 'number') m.poolId = d.poolId;
						else if (typeof d.poolId === 'object')
							m.poolId = new $util.LongBits(d.poolId.low >>> 0, d.poolId.high >>> 0).toNumber(true);
					}
					if (d.tokenOut != null) {
						if (typeof d.tokenOut !== 'object')
							throw TypeError('.osmosis.gamm.v1beta1.MsgExitSwapExternAmountOut.tokenOut: object expected');
						m.tokenOut = cosmos.base.v1beta1.Coin.fromObject(d.tokenOut);
					}
					if (d.shareInMaxAmount != null) {
						m.shareInMaxAmount = String(d.shareInMaxAmount);
					}
					return m;
				};
				MsgExitSwapExternAmountOut.toObject = function toObject(m, o) {
					if (!o) o = {};
					var d = {};
					if (o.defaults) {
						d.sender = '';
						if ($util.Long) {
							var n = new $util.Long(0, 0, true);
							d.poolId = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
						} else d.poolId = o.longs === String ? '0' : 0;
						d.tokenOut = null;
						d.shareInMaxAmount = '';
					}
					if (m.sender != null && m.hasOwnProperty('sender')) {
						d.sender = m.sender;
					}
					if (m.poolId != null && m.hasOwnProperty('poolId')) {
						if (typeof m.poolId === 'number') d.poolId = o.longs === String ? String(m.poolId) : m.poolId;
						else
							d.poolId =
								o.longs === String
									? $util.Long.prototype.toString.call(m.poolId)
									: o.longs === Number
									? new $util.LongBits(m.poolId.low >>> 0, m.poolId.high >>> 0).toNumber(true)
									: m.poolId;
					}
					if (m.tokenOut != null && m.hasOwnProperty('tokenOut')) {
						d.tokenOut = cosmos.base.v1beta1.Coin.toObject(m.tokenOut, o);
					}
					if (m.shareInMaxAmount != null && m.hasOwnProperty('shareInMaxAmount')) {
						d.shareInMaxAmount = m.shareInMaxAmount;
					}
					return d;
				};
				MsgExitSwapExternAmountOut.prototype.toJSON = function toJSON() {
					return this.constructor.toObject(this, protobuf.util.toJSONOptions);
				};
				return MsgExitSwapExternAmountOut;
			})();
			v1beta1.MsgExitSwapExternAmountOutResponse = (function() {
				function MsgExitSwapExternAmountOutResponse(p) {
					if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
				}
				MsgExitSwapExternAmountOutResponse.create = function create(properties) {
					return new MsgExitSwapExternAmountOutResponse(properties);
				};
				MsgExitSwapExternAmountOutResponse.encode = function encode(m, w) {
					if (!w) w = $Writer.create();
					return w;
				};
				MsgExitSwapExternAmountOutResponse.decode = function decode(r, l) {
					if (!(r instanceof $Reader)) r = $Reader.create(r);
					var c = l === undefined ? r.len : r.pos + l,
						m = new osmosis.gamm.v1beta1.MsgExitSwapExternAmountOutResponse();
					while (r.pos < c) {
						var t = r.uint32();
						switch (t >>> 3) {
							default:
								r.skipType(t & 7);
								break;
						}
					}
					return m;
				};
				MsgExitSwapExternAmountOutResponse.fromObject = function fromObject(d) {
					if (d instanceof osmosis.gamm.v1beta1.MsgExitSwapExternAmountOutResponse) return d;
					return new osmosis.gamm.v1beta1.MsgExitSwapExternAmountOutResponse();
				};
				MsgExitSwapExternAmountOutResponse.toObject = function toObject() {
					return {};
				};
				MsgExitSwapExternAmountOutResponse.prototype.toJSON = function toJSON() {
					return this.constructor.toObject(this, protobuf.util.toJSONOptions);
				};
				return MsgExitSwapExternAmountOutResponse;
			})();
			v1beta1.SmoothWeightChangeParams = (function() {
				function SmoothWeightChangeParams(p) {
					this.initialPoolWeights = [];
					this.targetPoolWeights = [];
					if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
				}
				SmoothWeightChangeParams.prototype.startTime = null;
				SmoothWeightChangeParams.prototype.duration = null;
				SmoothWeightChangeParams.prototype.initialPoolWeights = $util.emptyArray;
				SmoothWeightChangeParams.prototype.targetPoolWeights = $util.emptyArray;
				SmoothWeightChangeParams.create = function create(properties) {
					return new SmoothWeightChangeParams(properties);
				};
				SmoothWeightChangeParams.encode = function encode(m, w) {
					if (!w) w = $Writer.create();
					if (m.startTime != null && Object.hasOwnProperty.call(m, 'startTime'))
						google.protobuf.Timestamp.encode(m.startTime, w.uint32(10).fork()).ldelim();
					if (m.duration != null && Object.hasOwnProperty.call(m, 'duration'))
						google.protobuf.Duration.encode(m.duration, w.uint32(18).fork()).ldelim();
					if (m.initialPoolWeights != null && m.initialPoolWeights.length) {
						for (var i = 0; i < m.initialPoolWeights.length; ++i)
							osmosis.gamm.v1beta1.PoolAsset.encode(m.initialPoolWeights[i], w.uint32(26).fork()).ldelim();
					}
					if (m.targetPoolWeights != null && m.targetPoolWeights.length) {
						for (var i = 0; i < m.targetPoolWeights.length; ++i)
							osmosis.gamm.v1beta1.PoolAsset.encode(m.targetPoolWeights[i], w.uint32(34).fork()).ldelim();
					}
					return w;
				};
				SmoothWeightChangeParams.decode = function decode(r, l) {
					if (!(r instanceof $Reader)) r = $Reader.create(r);
					var c = l === undefined ? r.len : r.pos + l,
						m = new osmosis.gamm.v1beta1.SmoothWeightChangeParams();
					while (r.pos < c) {
						var t = r.uint32();
						switch (t >>> 3) {
							case 1:
								m.startTime = google.protobuf.Timestamp.decode(r, r.uint32());
								break;
							case 2:
								m.duration = google.protobuf.Duration.decode(r, r.uint32());
								break;
							case 3:
								if (!(m.initialPoolWeights && m.initialPoolWeights.length)) m.initialPoolWeights = [];
								m.initialPoolWeights.push(osmosis.gamm.v1beta1.PoolAsset.decode(r, r.uint32()));
								break;
							case 4:
								if (!(m.targetPoolWeights && m.targetPoolWeights.length)) m.targetPoolWeights = [];
								m.targetPoolWeights.push(osmosis.gamm.v1beta1.PoolAsset.decode(r, r.uint32()));
								break;
							default:
								r.skipType(t & 7);
								break;
						}
					}
					return m;
				};
				SmoothWeightChangeParams.fromObject = function fromObject(d) {
					if (d instanceof osmosis.gamm.v1beta1.SmoothWeightChangeParams) return d;
					var m = new osmosis.gamm.v1beta1.SmoothWeightChangeParams();
					if (d.startTime != null) {
						if (typeof d.startTime !== 'object')
							throw TypeError('.osmosis.gamm.v1beta1.SmoothWeightChangeParams.startTime: object expected');
						m.startTime = google.protobuf.Timestamp.fromObject(d.startTime);
					}
					if (d.duration != null) {
						if (typeof d.duration !== 'object')
							throw TypeError('.osmosis.gamm.v1beta1.SmoothWeightChangeParams.duration: object expected');
						m.duration = google.protobuf.Duration.fromObject(d.duration);
					}
					if (d.initialPoolWeights) {
						if (!Array.isArray(d.initialPoolWeights))
							throw TypeError('.osmosis.gamm.v1beta1.SmoothWeightChangeParams.initialPoolWeights: array expected');
						m.initialPoolWeights = [];
						for (var i = 0; i < d.initialPoolWeights.length; ++i) {
							if (typeof d.initialPoolWeights[i] !== 'object')
								throw TypeError('.osmosis.gamm.v1beta1.SmoothWeightChangeParams.initialPoolWeights: object expected');
							m.initialPoolWeights[i] = osmosis.gamm.v1beta1.PoolAsset.fromObject(d.initialPoolWeights[i]);
						}
					}
					if (d.targetPoolWeights) {
						if (!Array.isArray(d.targetPoolWeights))
							throw TypeError('.osmosis.gamm.v1beta1.SmoothWeightChangeParams.targetPoolWeights: array expected');
						m.targetPoolWeights = [];
						for (var i = 0; i < d.targetPoolWeights.length; ++i) {
							if (typeof d.targetPoolWeights[i] !== 'object')
								throw TypeError('.osmosis.gamm.v1beta1.SmoothWeightChangeParams.targetPoolWeights: object expected');
							m.targetPoolWeights[i] = osmosis.gamm.v1beta1.PoolAsset.fromObject(d.targetPoolWeights[i]);
						}
					}
					return m;
				};
				SmoothWeightChangeParams.toObject = function toObject(m, o) {
					if (!o) o = {};
					var d = {};
					if (o.arrays || o.defaults) {
						d.initialPoolWeights = [];
						d.targetPoolWeights = [];
					}
					if (o.defaults) {
						d.startTime = null;
						d.duration = null;
					}
					if (m.startTime != null && m.hasOwnProperty('startTime')) {
						d.startTime = google.protobuf.Timestamp.toObject(m.startTime, o);
					}
					if (m.duration != null && m.hasOwnProperty('duration')) {
						d.duration = google.protobuf.Duration.toObject(m.duration, o);
					}
					if (m.initialPoolWeights && m.initialPoolWeights.length) {
						d.initialPoolWeights = [];
						for (var j = 0; j < m.initialPoolWeights.length; ++j) {
							d.initialPoolWeights[j] = osmosis.gamm.v1beta1.PoolAsset.toObject(m.initialPoolWeights[j], o);
						}
					}
					if (m.targetPoolWeights && m.targetPoolWeights.length) {
						d.targetPoolWeights = [];
						for (var j = 0; j < m.targetPoolWeights.length; ++j) {
							d.targetPoolWeights[j] = osmosis.gamm.v1beta1.PoolAsset.toObject(m.targetPoolWeights[j], o);
						}
					}
					return d;
				};
				SmoothWeightChangeParams.prototype.toJSON = function toJSON() {
					return this.constructor.toObject(this, protobuf.util.toJSONOptions);
				};
				return SmoothWeightChangeParams;
			})();
			v1beta1.PoolParams = (function() {
				function PoolParams(p) {
					if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
				}
				PoolParams.prototype.swap_fee = '';
				PoolParams.prototype.exit_fee = '';
				PoolParams.prototype.smooth_weight_change_params = null;
				PoolParams.create = function create(properties) {
					return new PoolParams(properties);
				};
				PoolParams.encode = function encode(m, w) {
					if (!w) w = $Writer.create();
					if (m.swap_fee != null && Object.hasOwnProperty.call(m, 'swap_fee')) w.uint32(10).string(m.swap_fee);
					if (m.exit_fee != null && Object.hasOwnProperty.call(m, 'exit_fee')) w.uint32(18).string(m.exit_fee);
					if (m.smooth_weight_change_params != null && Object.hasOwnProperty.call(m, 'smooth_weight_change_params'))
						osmosis.gamm.v1beta1.SmoothWeightChangeParams.encode(
							m.smooth_weight_change_params,
							w.uint32(26).fork()
						).ldelim();
					return w;
				};
				PoolParams.decode = function decode(r, l) {
					if (!(r instanceof $Reader)) r = $Reader.create(r);
					var c = l === undefined ? r.len : r.pos + l,
						m = new osmosis.gamm.v1beta1.PoolParams();
					while (r.pos < c) {
						var t = r.uint32();
						switch (t >>> 3) {
							case 1:
								m.swap_fee = r.string();
								break;
							case 2:
								m.exit_fee = r.string();
								break;
							case 3:
								m.smooth_weight_change_params = osmosis.gamm.v1beta1.SmoothWeightChangeParams.decode(r, r.uint32());
								break;
							default:
								r.skipType(t & 7);
								break;
						}
					}
					return m;
				};
				PoolParams.fromObject = function fromObject(d) {
					if (d instanceof osmosis.gamm.v1beta1.PoolParams) return d;
					var m = new osmosis.gamm.v1beta1.PoolParams();
					if (d.swap_fee != null) {
						m.swap_fee = String(d.swap_fee);
					}
					if (d.exit_fee != null) {
						m.exit_fee = String(d.exit_fee);
					}
					if (d.smooth_weight_change_params != null) {
						if (typeof d.smooth_weight_change_params !== 'object')
							throw TypeError('.osmosis.gamm.v1beta1.PoolParams.smooth_weight_change_params: object expected');
						m.smooth_weight_change_params = osmosis.gamm.v1beta1.SmoothWeightChangeParams.fromObject(
							d.smooth_weight_change_params
						);
					}
					return m;
				};
				PoolParams.toObject = function toObject(m, o) {
					if (!o) o = {};
					var d = {};
					if (o.defaults) {
						d.swap_fee = '';
						d.exit_fee = '';
						d.smooth_weight_change_params = null;
					}
					if (m.swap_fee != null && m.hasOwnProperty('swap_fee')) {
						d.swap_fee = m.swap_fee;
					}
					if (m.exit_fee != null && m.hasOwnProperty('exit_fee')) {
						d.exit_fee = m.exit_fee;
					}
					if (m.smooth_weight_change_params != null && m.hasOwnProperty('smooth_weight_change_params')) {
						d.smooth_weight_change_params = osmosis.gamm.v1beta1.SmoothWeightChangeParams.toObject(
							m.smooth_weight_change_params,
							o
						);
					}
					return d;
				};
				PoolParams.prototype.toJSON = function toJSON() {
					return this.constructor.toObject(this, protobuf.util.toJSONOptions);
				};
				return PoolParams;
			})();
			v1beta1.Pool = (function() {
				function Pool(p) {
					this.pool_assets = [];
					if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
				}
				Pool.prototype.address = '';
				Pool.prototype.id = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
				Pool.prototype.pool_params = null;
				Pool.prototype.future_pool_governor = '';
				Pool.prototype.total_shares = null;
				Pool.prototype.pool_assets = $util.emptyArray;
				Pool.prototype.total_weight = '';
				Pool.create = function create(properties) {
					return new Pool(properties);
				};
				Pool.encode = function encode(m, w) {
					if (!w) w = $Writer.create();
					if (m.address != null && Object.hasOwnProperty.call(m, 'address')) w.uint32(10).string(m.address);
					if (m.id != null && Object.hasOwnProperty.call(m, 'id')) w.uint32(16).uint64(m.id);
					if (m.pool_params != null && Object.hasOwnProperty.call(m, 'pool_params'))
						osmosis.gamm.v1beta1.PoolParams.encode(m.pool_params, w.uint32(26).fork()).ldelim();
					if (m.future_pool_governor != null && Object.hasOwnProperty.call(m, 'future_pool_governor'))
						w.uint32(34).string(m.future_pool_governor);
					if (m.total_shares != null && Object.hasOwnProperty.call(m, 'total_shares'))
						cosmos.base.v1beta1.Coin.encode(m.total_shares, w.uint32(42).fork()).ldelim();
					if (m.pool_assets != null && m.pool_assets.length) {
						for (var i = 0; i < m.pool_assets.length; ++i)
							osmosis.gamm.v1beta1.PoolAsset.encode(m.pool_assets[i], w.uint32(50).fork()).ldelim();
					}
					if (m.total_weight != null && Object.hasOwnProperty.call(m, 'total_weight')) w.uint32(58).string(m.total_weight);
					return w;
				};
				Pool.decode = function decode(r, l) {
					if (!(r instanceof $Reader)) r = $Reader.create(r);
					var c = l === undefined ? r.len : r.pos + l,
						m = new osmosis.gamm.v1beta1.Pool();
					while (r.pos < c) {
						var t = r.uint32();
						switch (t >>> 3) {
							case 1:
								m.address = r.string();
								break;
							case 2:
								m.id = r.uint64();
								break;
							case 3:
								m.pool_params = osmosis.gamm.v1beta1.PoolParams.decode(r, r.uint32());
								break;
							case 4:
								m.future_pool_governor = r.string();
								break;
							case 5:
								m.total_shares = cosmos.base.v1beta1.Coin.decode(r, r.uint32());
								break;
							case 6:
								if (!(m.pool_assets && m.pool_assets.length)) m.pool_assets = [];
								m.pool_assets.push(osmosis.gamm.v1beta1.PoolAsset.decode(r, r.uint32()));
								break;
							case 7:
								m.total_weight = r.string();
								break;
							default:
								r.skipType(t & 7);
								break;
						}
					}
					return m;
				};
				Pool.fromObject = function fromObject(d) {
					if (d instanceof osmosis.gamm.v1beta1.Pool) return d;
					var m = new osmosis.gamm.v1beta1.Pool();
					if (d.address != null) {
						m.address = String(d.address);
					}
					if (d.id != null) {
						if ($util.Long) (m.id = $util.Long.fromValue(d.id)).unsigned = true;
						else if (typeof d.id === 'string') m.id = parseInt(d.id, 10);
						else if (typeof d.id === 'number') m.id = d.id;
						else if (typeof d.id === 'object')
							m.id = new $util.LongBits(d.id.low >>> 0, d.id.high >>> 0).toNumber(true);
					}
					if (d.pool_params != null) {
						if (typeof d.pool_params !== 'object')
							throw TypeError('.osmosis.gamm.v1beta1.Pool.pool_params: object expected');
						m.pool_params = osmosis.gamm.v1beta1.PoolParams.fromObject(d.pool_params);
					}
					if (d.future_pool_governor != null) {
						m.future_pool_governor = String(d.future_pool_governor);
					}
					if (d.total_shares != null) {
						if (typeof d.total_shares !== 'object')
							throw TypeError('.osmosis.gamm.v1beta1.Pool.total_shares: object expected');
						m.total_shares = cosmos.base.v1beta1.Coin.fromObject(d.total_shares);
					}
					if (d.pool_assets) {
						if (!Array.isArray(d.pool_assets)) throw TypeError('.osmosis.gamm.v1beta1.Pool.pool_assets: array expected');
						m.pool_assets = [];
						for (var i = 0; i < d.pool_assets.length; ++i) {
							if (typeof d.pool_assets[i] !== 'object')
								throw TypeError('.osmosis.gamm.v1beta1.Pool.pool_assets: object expected');
							m.pool_assets[i] = osmosis.gamm.v1beta1.PoolAsset.fromObject(d.pool_assets[i]);
						}
					}
					if (d.total_weight != null) {
						m.total_weight = String(d.total_weight);
					}
					return m;
				};
				Pool.toObject = function toObject(m, o) {
					if (!o) o = {};
					var d = {};
					if (o.arrays || o.defaults) {
						d.pool_assets = [];
					}
					if (o.defaults) {
						d.address = '';
						if ($util.Long) {
							var n = new $util.Long(0, 0, true);
							d.id = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
						} else d.id = o.longs === String ? '0' : 0;
						d.pool_params = null;
						d.future_pool_governor = '';
						d.total_shares = null;
						d.total_weight = '';
					}
					if (m.address != null && m.hasOwnProperty('address')) {
						d.address = m.address;
					}
					if (m.id != null && m.hasOwnProperty('id')) {
						if (typeof m.id === 'number') d.id = o.longs === String ? String(m.id) : m.id;
						else
							d.id =
								o.longs === String
									? $util.Long.prototype.toString.call(m.id)
									: o.longs === Number
									? new $util.LongBits(m.id.low >>> 0, m.id.high >>> 0).toNumber(true)
									: m.id;
					}
					if (m.pool_params != null && m.hasOwnProperty('pool_params')) {
						d.pool_params = osmosis.gamm.v1beta1.PoolParams.toObject(m.pool_params, o);
					}
					if (m.future_pool_governor != null && m.hasOwnProperty('future_pool_governor')) {
						d.future_pool_governor = m.future_pool_governor;
					}
					if (m.total_shares != null && m.hasOwnProperty('total_shares')) {
						d.total_shares = cosmos.base.v1beta1.Coin.toObject(m.total_shares, o);
					}
					if (m.pool_assets && m.pool_assets.length) {
						d.pool_assets = [];
						for (var j = 0; j < m.pool_assets.length; ++j) {
							d.pool_assets[j] = osmosis.gamm.v1beta1.PoolAsset.toObject(m.pool_assets[j], o);
						}
					}
					if (m.total_weight != null && m.hasOwnProperty('total_weight')) {
						d.total_weight = m.total_weight;
					}
					return d;
				};
				Pool.prototype.toJSON = function toJSON() {
					return this.constructor.toObject(this, protobuf.util.toJSONOptions);
				};
				return Pool;
			})();
			return v1beta1;
		})();
		return gamm;
	})();
	osmosis.lockup = (function() {
		const lockup = {};
		lockup.PeriodLock = (function() {
			function PeriodLock(p) {
				this.coins = [];
				if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
			}
			PeriodLock.prototype.ID = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
			PeriodLock.prototype.owner = '';
			PeriodLock.prototype.duration = null;
			PeriodLock.prototype.endTime = null;
			PeriodLock.prototype.coins = $util.emptyArray;
			PeriodLock.create = function create(properties) {
				return new PeriodLock(properties);
			};
			PeriodLock.encode = function encode(m, w) {
				if (!w) w = $Writer.create();
				if (m.ID != null && Object.hasOwnProperty.call(m, 'ID')) w.uint32(8).uint64(m.ID);
				if (m.owner != null && Object.hasOwnProperty.call(m, 'owner')) w.uint32(18).string(m.owner);
				if (m.duration != null && Object.hasOwnProperty.call(m, 'duration'))
					google.protobuf.Duration.encode(m.duration, w.uint32(26).fork()).ldelim();
				if (m.endTime != null && Object.hasOwnProperty.call(m, 'endTime'))
					google.protobuf.Timestamp.encode(m.endTime, w.uint32(34).fork()).ldelim();
				if (m.coins != null && m.coins.length) {
					for (var i = 0; i < m.coins.length; ++i)
						cosmos.base.v1beta1.Coin.encode(m.coins[i], w.uint32(42).fork()).ldelim();
				}
				return w;
			};
			PeriodLock.decode = function decode(r, l) {
				if (!(r instanceof $Reader)) r = $Reader.create(r);
				var c = l === undefined ? r.len : r.pos + l,
					m = new osmosis.lockup.PeriodLock();
				while (r.pos < c) {
					var t = r.uint32();
					switch (t >>> 3) {
						case 1:
							m.ID = r.uint64();
							break;
						case 2:
							m.owner = r.string();
							break;
						case 3:
							m.duration = google.protobuf.Duration.decode(r, r.uint32());
							break;
						case 4:
							m.endTime = google.protobuf.Timestamp.decode(r, r.uint32());
							break;
						case 5:
							if (!(m.coins && m.coins.length)) m.coins = [];
							m.coins.push(cosmos.base.v1beta1.Coin.decode(r, r.uint32()));
							break;
						default:
							r.skipType(t & 7);
							break;
					}
				}
				return m;
			};
			PeriodLock.fromObject = function fromObject(d) {
				if (d instanceof osmosis.lockup.PeriodLock) return d;
				var m = new osmosis.lockup.PeriodLock();
				if (d.ID != null) {
					if ($util.Long) (m.ID = $util.Long.fromValue(d.ID)).unsigned = true;
					else if (typeof d.ID === 'string') m.ID = parseInt(d.ID, 10);
					else if (typeof d.ID === 'number') m.ID = d.ID;
					else if (typeof d.ID === 'object') m.ID = new $util.LongBits(d.ID.low >>> 0, d.ID.high >>> 0).toNumber(true);
				}
				if (d.owner != null) {
					m.owner = String(d.owner);
				}
				if (d.duration != null) {
					if (typeof d.duration !== 'object') throw TypeError('.osmosis.lockup.PeriodLock.duration: object expected');
					m.duration = google.protobuf.Duration.fromObject(d.duration);
				}
				if (d.endTime != null) {
					if (typeof d.endTime !== 'object') throw TypeError('.osmosis.lockup.PeriodLock.endTime: object expected');
					m.endTime = google.protobuf.Timestamp.fromObject(d.endTime);
				}
				if (d.coins) {
					if (!Array.isArray(d.coins)) throw TypeError('.osmosis.lockup.PeriodLock.coins: array expected');
					m.coins = [];
					for (var i = 0; i < d.coins.length; ++i) {
						if (typeof d.coins[i] !== 'object') throw TypeError('.osmosis.lockup.PeriodLock.coins: object expected');
						m.coins[i] = cosmos.base.v1beta1.Coin.fromObject(d.coins[i]);
					}
				}
				return m;
			};
			PeriodLock.toObject = function toObject(m, o) {
				if (!o) o = {};
				var d = {};
				if (o.arrays || o.defaults) {
					d.coins = [];
				}
				if (o.defaults) {
					if ($util.Long) {
						var n = new $util.Long(0, 0, true);
						d.ID = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
					} else d.ID = o.longs === String ? '0' : 0;
					d.owner = '';
					d.duration = null;
					d.endTime = null;
				}
				if (m.ID != null && m.hasOwnProperty('ID')) {
					if (typeof m.ID === 'number') d.ID = o.longs === String ? String(m.ID) : m.ID;
					else
						d.ID =
							o.longs === String
								? $util.Long.prototype.toString.call(m.ID)
								: o.longs === Number
								? new $util.LongBits(m.ID.low >>> 0, m.ID.high >>> 0).toNumber(true)
								: m.ID;
				}
				if (m.owner != null && m.hasOwnProperty('owner')) {
					d.owner = m.owner;
				}
				if (m.duration != null && m.hasOwnProperty('duration')) {
					d.duration = google.protobuf.Duration.toObject(m.duration, o);
				}
				if (m.endTime != null && m.hasOwnProperty('endTime')) {
					d.endTime = google.protobuf.Timestamp.toObject(m.endTime, o);
				}
				if (m.coins && m.coins.length) {
					d.coins = [];
					for (var j = 0; j < m.coins.length; ++j) {
						d.coins[j] = cosmos.base.v1beta1.Coin.toObject(m.coins[j], o);
					}
				}
				return d;
			};
			PeriodLock.prototype.toJSON = function toJSON() {
				return this.constructor.toObject(this, protobuf.util.toJSONOptions);
			};
			return PeriodLock;
		})();
		lockup.LockQueryType = (function() {
			const valuesById = {},
				values = Object.create(valuesById);
			values[(valuesById[0] = 'ByDuration')] = 0;
			values[(valuesById[1] = 'ByTime')] = 1;
			return values;
		})();
		lockup.QueryCondition = (function() {
			function QueryCondition(p) {
				if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
			}
			QueryCondition.prototype.lockQueryType = 0;
			QueryCondition.prototype.denom = '';
			QueryCondition.prototype.duration = null;
			QueryCondition.prototype.timestamp = null;
			QueryCondition.create = function create(properties) {
				return new QueryCondition(properties);
			};
			QueryCondition.encode = function encode(m, w) {
				if (!w) w = $Writer.create();
				if (m.lockQueryType != null && Object.hasOwnProperty.call(m, 'lockQueryType'))
					w.uint32(8).int32(m.lockQueryType);
				if (m.denom != null && Object.hasOwnProperty.call(m, 'denom')) w.uint32(18).string(m.denom);
				if (m.duration != null && Object.hasOwnProperty.call(m, 'duration'))
					google.protobuf.Duration.encode(m.duration, w.uint32(26).fork()).ldelim();
				if (m.timestamp != null && Object.hasOwnProperty.call(m, 'timestamp'))
					google.protobuf.Timestamp.encode(m.timestamp, w.uint32(34).fork()).ldelim();
				return w;
			};
			QueryCondition.decode = function decode(r, l) {
				if (!(r instanceof $Reader)) r = $Reader.create(r);
				var c = l === undefined ? r.len : r.pos + l,
					m = new osmosis.lockup.QueryCondition();
				while (r.pos < c) {
					var t = r.uint32();
					switch (t >>> 3) {
						case 1:
							m.lockQueryType = r.int32();
							break;
						case 2:
							m.denom = r.string();
							break;
						case 3:
							m.duration = google.protobuf.Duration.decode(r, r.uint32());
							break;
						case 4:
							m.timestamp = google.protobuf.Timestamp.decode(r, r.uint32());
							break;
						default:
							r.skipType(t & 7);
							break;
					}
				}
				return m;
			};
			QueryCondition.fromObject = function fromObject(d) {
				if (d instanceof osmosis.lockup.QueryCondition) return d;
				var m = new osmosis.lockup.QueryCondition();
				switch (d.lockQueryType) {
					case 'ByDuration':
					case 0:
						m.lockQueryType = 0;
						break;
					case 'ByTime':
					case 1:
						m.lockQueryType = 1;
						break;
				}
				if (d.denom != null) {
					m.denom = String(d.denom);
				}
				if (d.duration != null) {
					if (typeof d.duration !== 'object')
						throw TypeError('.osmosis.lockup.QueryCondition.duration: object expected');
					m.duration = google.protobuf.Duration.fromObject(d.duration);
				}
				if (d.timestamp != null) {
					if (typeof d.timestamp !== 'object')
						throw TypeError('.osmosis.lockup.QueryCondition.timestamp: object expected');
					m.timestamp = google.protobuf.Timestamp.fromObject(d.timestamp);
				}
				return m;
			};
			QueryCondition.toObject = function toObject(m, o) {
				if (!o) o = {};
				var d = {};
				if (o.defaults) {
					d.lockQueryType = o.enums === String ? 'ByDuration' : 0;
					d.denom = '';
					d.duration = null;
					d.timestamp = null;
				}
				if (m.lockQueryType != null && m.hasOwnProperty('lockQueryType')) {
					d.lockQueryType = o.enums === String ? osmosis.lockup.LockQueryType[m.lockQueryType] : m.lockQueryType;
				}
				if (m.denom != null && m.hasOwnProperty('denom')) {
					d.denom = m.denom;
				}
				if (m.duration != null && m.hasOwnProperty('duration')) {
					d.duration = google.protobuf.Duration.toObject(m.duration, o);
				}
				if (m.timestamp != null && m.hasOwnProperty('timestamp')) {
					d.timestamp = google.protobuf.Timestamp.toObject(m.timestamp, o);
				}
				return d;
			};
			QueryCondition.prototype.toJSON = function toJSON() {
				return this.constructor.toObject(this, protobuf.util.toJSONOptions);
			};
			return QueryCondition;
		})();
		lockup.SyntheticLock = (function() {
			function SyntheticLock(p) {
				if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
			}
			SyntheticLock.prototype.underlyingLockId = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
			SyntheticLock.prototype.synthDenom = '';
			SyntheticLock.prototype.endTime = null;
			SyntheticLock.prototype.duration = null;
			SyntheticLock.create = function create(properties) {
				return new SyntheticLock(properties);
			};
			SyntheticLock.encode = function encode(m, w) {
				if (!w) w = $Writer.create();
				if (m.underlyingLockId != null && Object.hasOwnProperty.call(m, 'underlyingLockId'))
					w.uint32(8).uint64(m.underlyingLockId);
				if (m.synthDenom != null && Object.hasOwnProperty.call(m, 'synthDenom')) w.uint32(18).string(m.synthDenom);
				if (m.endTime != null && Object.hasOwnProperty.call(m, 'endTime'))
					google.protobuf.Timestamp.encode(m.endTime, w.uint32(26).fork()).ldelim();
				if (m.duration != null && Object.hasOwnProperty.call(m, 'duration'))
					google.protobuf.Duration.encode(m.duration, w.uint32(34).fork()).ldelim();
				return w;
			};
			SyntheticLock.decode = function decode(r, l) {
				if (!(r instanceof $Reader)) r = $Reader.create(r);
				var c = l === undefined ? r.len : r.pos + l,
					m = new osmosis.lockup.SyntheticLock();
				while (r.pos < c) {
					var t = r.uint32();
					switch (t >>> 3) {
						case 1:
							m.underlyingLockId = r.uint64();
							break;
						case 2:
							m.synthDenom = r.string();
							break;
						case 3:
							m.endTime = google.protobuf.Timestamp.decode(r, r.uint32());
							break;
						case 4:
							m.duration = google.protobuf.Duration.decode(r, r.uint32());
							break;
						default:
							r.skipType(t & 7);
							break;
					}
				}
				return m;
			};
			SyntheticLock.fromObject = function fromObject(d) {
				if (d instanceof osmosis.lockup.SyntheticLock) return d;
				var m = new osmosis.lockup.SyntheticLock();
				if (d.underlyingLockId != null) {
					if ($util.Long) (m.underlyingLockId = $util.Long.fromValue(d.underlyingLockId)).unsigned = true;
					else if (typeof d.underlyingLockId === 'string') m.underlyingLockId = parseInt(d.underlyingLockId, 10);
					else if (typeof d.underlyingLockId === 'number') m.underlyingLockId = d.underlyingLockId;
					else if (typeof d.underlyingLockId === 'object')
						m.underlyingLockId = new $util.LongBits(
							d.underlyingLockId.low >>> 0,
							d.underlyingLockId.high >>> 0
						).toNumber(true);
				}
				if (d.synthDenom != null) {
					m.synthDenom = String(d.synthDenom);
				}
				if (d.endTime != null) {
					if (typeof d.endTime !== 'object') throw TypeError('.osmosis.lockup.SyntheticLock.endTime: object expected');
					m.endTime = google.protobuf.Timestamp.fromObject(d.endTime);
				}
				if (d.duration != null) {
					if (typeof d.duration !== 'object')
						throw TypeError('.osmosis.lockup.SyntheticLock.duration: object expected');
					m.duration = google.protobuf.Duration.fromObject(d.duration);
				}
				return m;
			};
			SyntheticLock.toObject = function toObject(m, o) {
				if (!o) o = {};
				var d = {};
				if (o.defaults) {
					if ($util.Long) {
						var n = new $util.Long(0, 0, true);
						d.underlyingLockId = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
					} else d.underlyingLockId = o.longs === String ? '0' : 0;
					d.synthDenom = '';
					d.endTime = null;
					d.duration = null;
				}
				if (m.underlyingLockId != null && m.hasOwnProperty('underlyingLockId')) {
					if (typeof m.underlyingLockId === 'number')
						d.underlyingLockId = o.longs === String ? String(m.underlyingLockId) : m.underlyingLockId;
					else
						d.underlyingLockId =
							o.longs === String
								? $util.Long.prototype.toString.call(m.underlyingLockId)
								: o.longs === Number
								? new $util.LongBits(m.underlyingLockId.low >>> 0, m.underlyingLockId.high >>> 0).toNumber(true)
								: m.underlyingLockId;
				}
				if (m.synthDenom != null && m.hasOwnProperty('synthDenom')) {
					d.synthDenom = m.synthDenom;
				}
				if (m.endTime != null && m.hasOwnProperty('endTime')) {
					d.endTime = google.protobuf.Timestamp.toObject(m.endTime, o);
				}
				if (m.duration != null && m.hasOwnProperty('duration')) {
					d.duration = google.protobuf.Duration.toObject(m.duration, o);
				}
				return d;
			};
			SyntheticLock.prototype.toJSON = function toJSON() {
				return this.constructor.toObject(this, protobuf.util.toJSONOptions);
			};
			return SyntheticLock;
		})();
		lockup.Msg = (function() {
			function Msg(rpcImpl, requestDelimited, responseDelimited) {
				protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
			}
			(Msg.prototype = Object.create(protobuf.rpc.Service.prototype)).constructor = Msg;
			Msg.create = function create(rpcImpl, requestDelimited, responseDelimited) {
				return new this(rpcImpl, requestDelimited, responseDelimited);
			};
			Object.defineProperty(
				(Msg.prototype.lockTokens = function lockTokens(request, callback) {
					return this.rpcCall(
						lockTokens,
						osmosis.lockup.MsgLockTokens,
						osmosis.lockup.MsgLockTokensResponse,
						request,
						callback
					);
				}),
				'name',
				{ value: 'LockTokens' }
			);
			Object.defineProperty(
				(Msg.prototype.beginUnlockingAll = function beginUnlockingAll(request, callback) {
					return this.rpcCall(
						beginUnlockingAll,
						osmosis.lockup.MsgBeginUnlockingAll,
						osmosis.lockup.MsgBeginUnlockingAllResponse,
						request,
						callback
					);
				}),
				'name',
				{ value: 'BeginUnlockingAll' }
			);
			Object.defineProperty(
				(Msg.prototype.beginUnlocking = function beginUnlocking(request, callback) {
					return this.rpcCall(
						beginUnlocking,
						osmosis.lockup.MsgBeginUnlocking,
						osmosis.lockup.MsgBeginUnlockingResponse,
						request,
						callback
					);
				}),
				'name',
				{ value: 'BeginUnlocking' }
			);
			return Msg;
		})();
		lockup.MsgLockTokens = (function() {
			function MsgLockTokens(p) {
				this.coins = [];
				if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
			}
			MsgLockTokens.prototype.owner = '';
			MsgLockTokens.prototype.duration = null;
			MsgLockTokens.prototype.coins = $util.emptyArray;
			MsgLockTokens.create = function create(properties) {
				return new MsgLockTokens(properties);
			};
			MsgLockTokens.encode = function encode(m, w) {
				if (!w) w = $Writer.create();
				if (m.owner != null && Object.hasOwnProperty.call(m, 'owner')) w.uint32(10).string(m.owner);
				if (m.duration != null && Object.hasOwnProperty.call(m, 'duration'))
					google.protobuf.Duration.encode(m.duration, w.uint32(18).fork()).ldelim();
				if (m.coins != null && m.coins.length) {
					for (var i = 0; i < m.coins.length; ++i)
						cosmos.base.v1beta1.Coin.encode(m.coins[i], w.uint32(26).fork()).ldelim();
				}
				return w;
			};
			MsgLockTokens.decode = function decode(r, l) {
				if (!(r instanceof $Reader)) r = $Reader.create(r);
				var c = l === undefined ? r.len : r.pos + l,
					m = new osmosis.lockup.MsgLockTokens();
				while (r.pos < c) {
					var t = r.uint32();
					switch (t >>> 3) {
						case 1:
							m.owner = r.string();
							break;
						case 2:
							m.duration = google.protobuf.Duration.decode(r, r.uint32());
							break;
						case 3:
							if (!(m.coins && m.coins.length)) m.coins = [];
							m.coins.push(cosmos.base.v1beta1.Coin.decode(r, r.uint32()));
							break;
						default:
							r.skipType(t & 7);
							break;
					}
				}
				return m;
			};
			MsgLockTokens.fromObject = function fromObject(d) {
				if (d instanceof osmosis.lockup.MsgLockTokens) return d;
				var m = new osmosis.lockup.MsgLockTokens();
				if (d.owner != null) {
					m.owner = String(d.owner);
				}
				if (d.duration != null) {
					if (typeof d.duration !== 'object')
						throw TypeError('.osmosis.lockup.MsgLockTokens.duration: object expected');
					m.duration = google.protobuf.Duration.fromObject(d.duration);
				}
				if (d.coins) {
					if (!Array.isArray(d.coins)) throw TypeError('.osmosis.lockup.MsgLockTokens.coins: array expected');
					m.coins = [];
					for (var i = 0; i < d.coins.length; ++i) {
						if (typeof d.coins[i] !== 'object') throw TypeError('.osmosis.lockup.MsgLockTokens.coins: object expected');
						m.coins[i] = cosmos.base.v1beta1.Coin.fromObject(d.coins[i]);
					}
				}
				return m;
			};
			MsgLockTokens.toObject = function toObject(m, o) {
				if (!o) o = {};
				var d = {};
				if (o.arrays || o.defaults) {
					d.coins = [];
				}
				if (o.defaults) {
					d.owner = '';
					d.duration = null;
				}
				if (m.owner != null && m.hasOwnProperty('owner')) {
					d.owner = m.owner;
				}
				if (m.duration != null && m.hasOwnProperty('duration')) {
					d.duration = google.protobuf.Duration.toObject(m.duration, o);
				}
				if (m.coins && m.coins.length) {
					d.coins = [];
					for (var j = 0; j < m.coins.length; ++j) {
						d.coins[j] = cosmos.base.v1beta1.Coin.toObject(m.coins[j], o);
					}
				}
				return d;
			};
			MsgLockTokens.prototype.toJSON = function toJSON() {
				return this.constructor.toObject(this, protobuf.util.toJSONOptions);
			};
			return MsgLockTokens;
		})();
		lockup.MsgLockTokensResponse = (function() {
			function MsgLockTokensResponse(p) {
				if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
			}
			MsgLockTokensResponse.prototype.ID = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
			MsgLockTokensResponse.create = function create(properties) {
				return new MsgLockTokensResponse(properties);
			};
			MsgLockTokensResponse.encode = function encode(m, w) {
				if (!w) w = $Writer.create();
				if (m.ID != null && Object.hasOwnProperty.call(m, 'ID')) w.uint32(8).uint64(m.ID);
				return w;
			};
			MsgLockTokensResponse.decode = function decode(r, l) {
				if (!(r instanceof $Reader)) r = $Reader.create(r);
				var c = l === undefined ? r.len : r.pos + l,
					m = new osmosis.lockup.MsgLockTokensResponse();
				while (r.pos < c) {
					var t = r.uint32();
					switch (t >>> 3) {
						case 1:
							m.ID = r.uint64();
							break;
						default:
							r.skipType(t & 7);
							break;
					}
				}
				return m;
			};
			MsgLockTokensResponse.fromObject = function fromObject(d) {
				if (d instanceof osmosis.lockup.MsgLockTokensResponse) return d;
				var m = new osmosis.lockup.MsgLockTokensResponse();
				if (d.ID != null) {
					if ($util.Long) (m.ID = $util.Long.fromValue(d.ID)).unsigned = true;
					else if (typeof d.ID === 'string') m.ID = parseInt(d.ID, 10);
					else if (typeof d.ID === 'number') m.ID = d.ID;
					else if (typeof d.ID === 'object') m.ID = new $util.LongBits(d.ID.low >>> 0, d.ID.high >>> 0).toNumber(true);
				}
				return m;
			};
			MsgLockTokensResponse.toObject = function toObject(m, o) {
				if (!o) o = {};
				var d = {};
				if (o.defaults) {
					if ($util.Long) {
						var n = new $util.Long(0, 0, true);
						d.ID = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
					} else d.ID = o.longs === String ? '0' : 0;
				}
				if (m.ID != null && m.hasOwnProperty('ID')) {
					if (typeof m.ID === 'number') d.ID = o.longs === String ? String(m.ID) : m.ID;
					else
						d.ID =
							o.longs === String
								? $util.Long.prototype.toString.call(m.ID)
								: o.longs === Number
								? new $util.LongBits(m.ID.low >>> 0, m.ID.high >>> 0).toNumber(true)
								: m.ID;
				}
				return d;
			};
			MsgLockTokensResponse.prototype.toJSON = function toJSON() {
				return this.constructor.toObject(this, protobuf.util.toJSONOptions);
			};
			return MsgLockTokensResponse;
		})();
		lockup.MsgBeginUnlockingAll = (function() {
			function MsgBeginUnlockingAll(p) {
				if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
			}
			MsgBeginUnlockingAll.prototype.owner = '';
			MsgBeginUnlockingAll.create = function create(properties) {
				return new MsgBeginUnlockingAll(properties);
			};
			MsgBeginUnlockingAll.encode = function encode(m, w) {
				if (!w) w = $Writer.create();
				if (m.owner != null && Object.hasOwnProperty.call(m, 'owner')) w.uint32(10).string(m.owner);
				return w;
			};
			MsgBeginUnlockingAll.decode = function decode(r, l) {
				if (!(r instanceof $Reader)) r = $Reader.create(r);
				var c = l === undefined ? r.len : r.pos + l,
					m = new osmosis.lockup.MsgBeginUnlockingAll();
				while (r.pos < c) {
					var t = r.uint32();
					switch (t >>> 3) {
						case 1:
							m.owner = r.string();
							break;
						default:
							r.skipType(t & 7);
							break;
					}
				}
				return m;
			};
			MsgBeginUnlockingAll.fromObject = function fromObject(d) {
				if (d instanceof osmosis.lockup.MsgBeginUnlockingAll) return d;
				var m = new osmosis.lockup.MsgBeginUnlockingAll();
				if (d.owner != null) {
					m.owner = String(d.owner);
				}
				return m;
			};
			MsgBeginUnlockingAll.toObject = function toObject(m, o) {
				if (!o) o = {};
				var d = {};
				if (o.defaults) {
					d.owner = '';
				}
				if (m.owner != null && m.hasOwnProperty('owner')) {
					d.owner = m.owner;
				}
				return d;
			};
			MsgBeginUnlockingAll.prototype.toJSON = function toJSON() {
				return this.constructor.toObject(this, protobuf.util.toJSONOptions);
			};
			return MsgBeginUnlockingAll;
		})();
		lockup.MsgBeginUnlockingAllResponse = (function() {
			function MsgBeginUnlockingAllResponse(p) {
				this.unlocks = [];
				if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
			}
			MsgBeginUnlockingAllResponse.prototype.unlocks = $util.emptyArray;
			MsgBeginUnlockingAllResponse.create = function create(properties) {
				return new MsgBeginUnlockingAllResponse(properties);
			};
			MsgBeginUnlockingAllResponse.encode = function encode(m, w) {
				if (!w) w = $Writer.create();
				if (m.unlocks != null && m.unlocks.length) {
					for (var i = 0; i < m.unlocks.length; ++i)
						osmosis.lockup.PeriodLock.encode(m.unlocks[i], w.uint32(10).fork()).ldelim();
				}
				return w;
			};
			MsgBeginUnlockingAllResponse.decode = function decode(r, l) {
				if (!(r instanceof $Reader)) r = $Reader.create(r);
				var c = l === undefined ? r.len : r.pos + l,
					m = new osmosis.lockup.MsgBeginUnlockingAllResponse();
				while (r.pos < c) {
					var t = r.uint32();
					switch (t >>> 3) {
						case 1:
							if (!(m.unlocks && m.unlocks.length)) m.unlocks = [];
							m.unlocks.push(osmosis.lockup.PeriodLock.decode(r, r.uint32()));
							break;
						default:
							r.skipType(t & 7);
							break;
					}
				}
				return m;
			};
			MsgBeginUnlockingAllResponse.fromObject = function fromObject(d) {
				if (d instanceof osmosis.lockup.MsgBeginUnlockingAllResponse) return d;
				var m = new osmosis.lockup.MsgBeginUnlockingAllResponse();
				if (d.unlocks) {
					if (!Array.isArray(d.unlocks))
						throw TypeError('.osmosis.lockup.MsgBeginUnlockingAllResponse.unlocks: array expected');
					m.unlocks = [];
					for (var i = 0; i < d.unlocks.length; ++i) {
						if (typeof d.unlocks[i] !== 'object')
							throw TypeError('.osmosis.lockup.MsgBeginUnlockingAllResponse.unlocks: object expected');
						m.unlocks[i] = osmosis.lockup.PeriodLock.fromObject(d.unlocks[i]);
					}
				}
				return m;
			};
			MsgBeginUnlockingAllResponse.toObject = function toObject(m, o) {
				if (!o) o = {};
				var d = {};
				if (o.arrays || o.defaults) {
					d.unlocks = [];
				}
				if (m.unlocks && m.unlocks.length) {
					d.unlocks = [];
					for (var j = 0; j < m.unlocks.length; ++j) {
						d.unlocks[j] = osmosis.lockup.PeriodLock.toObject(m.unlocks[j], o);
					}
				}
				return d;
			};
			MsgBeginUnlockingAllResponse.prototype.toJSON = function toJSON() {
				return this.constructor.toObject(this, protobuf.util.toJSONOptions);
			};
			return MsgBeginUnlockingAllResponse;
		})();
		lockup.MsgBeginUnlocking = (function() {
			function MsgBeginUnlocking(p) {
				this.coins = [];
				if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
			}
			MsgBeginUnlocking.prototype.owner = '';
			MsgBeginUnlocking.prototype.ID = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
			MsgBeginUnlocking.prototype.coins = $util.emptyArray;
			MsgBeginUnlocking.create = function create(properties) {
				return new MsgBeginUnlocking(properties);
			};
			MsgBeginUnlocking.encode = function encode(m, w) {
				if (!w) w = $Writer.create();
				if (m.owner != null && Object.hasOwnProperty.call(m, 'owner')) w.uint32(10).string(m.owner);
				if (m.ID != null && Object.hasOwnProperty.call(m, 'ID')) w.uint32(16).uint64(m.ID);
				if (m.coins != null && m.coins.length) {
					for (var i = 0; i < m.coins.length; ++i)
						cosmos.base.v1beta1.Coin.encode(m.coins[i], w.uint32(26).fork()).ldelim();
				}
				return w;
			};
			MsgBeginUnlocking.decode = function decode(r, l) {
				if (!(r instanceof $Reader)) r = $Reader.create(r);
				var c = l === undefined ? r.len : r.pos + l,
					m = new osmosis.lockup.MsgBeginUnlocking();
				while (r.pos < c) {
					var t = r.uint32();
					switch (t >>> 3) {
						case 1:
							m.owner = r.string();
							break;
						case 2:
							m.ID = r.uint64();
							break;
						case 3:
							if (!(m.coins && m.coins.length)) m.coins = [];
							m.coins.push(cosmos.base.v1beta1.Coin.decode(r, r.uint32()));
							break;
						default:
							r.skipType(t & 7);
							break;
					}
				}
				return m;
			};
			MsgBeginUnlocking.fromObject = function fromObject(d) {
				if (d instanceof osmosis.lockup.MsgBeginUnlocking) return d;
				var m = new osmosis.lockup.MsgBeginUnlocking();
				if (d.owner != null) {
					m.owner = String(d.owner);
				}
				if (d.ID != null) {
					if ($util.Long) (m.ID = $util.Long.fromValue(d.ID)).unsigned = true;
					else if (typeof d.ID === 'string') m.ID = parseInt(d.ID, 10);
					else if (typeof d.ID === 'number') m.ID = d.ID;
					else if (typeof d.ID === 'object') m.ID = new $util.LongBits(d.ID.low >>> 0, d.ID.high >>> 0).toNumber(true);
				}
				if (d.coins) {
					if (!Array.isArray(d.coins)) throw TypeError('.osmosis.lockup.MsgBeginUnlocking.coins: array expected');
					m.coins = [];
					for (var i = 0; i < d.coins.length; ++i) {
						if (typeof d.coins[i] !== 'object')
							throw TypeError('.osmosis.lockup.MsgBeginUnlocking.coins: object expected');
						m.coins[i] = cosmos.base.v1beta1.Coin.fromObject(d.coins[i]);
					}
				}
				return m;
			};
			MsgBeginUnlocking.toObject = function toObject(m, o) {
				if (!o) o = {};
				var d = {};
				if (o.arrays || o.defaults) {
					d.coins = [];
				}
				if (o.defaults) {
					d.owner = '';
					if ($util.Long) {
						var n = new $util.Long(0, 0, true);
						d.ID = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
					} else d.ID = o.longs === String ? '0' : 0;
				}
				if (m.owner != null && m.hasOwnProperty('owner')) {
					d.owner = m.owner;
				}
				if (m.ID != null && m.hasOwnProperty('ID')) {
					if (typeof m.ID === 'number') d.ID = o.longs === String ? String(m.ID) : m.ID;
					else
						d.ID =
							o.longs === String
								? $util.Long.prototype.toString.call(m.ID)
								: o.longs === Number
								? new $util.LongBits(m.ID.low >>> 0, m.ID.high >>> 0).toNumber(true)
								: m.ID;
				}
				if (m.coins && m.coins.length) {
					d.coins = [];
					for (var j = 0; j < m.coins.length; ++j) {
						d.coins[j] = cosmos.base.v1beta1.Coin.toObject(m.coins[j], o);
					}
				}
				return d;
			};
			MsgBeginUnlocking.prototype.toJSON = function toJSON() {
				return this.constructor.toObject(this, protobuf.util.toJSONOptions);
			};
			return MsgBeginUnlocking;
		})();
		lockup.MsgBeginUnlockingResponse = (function() {
			function MsgBeginUnlockingResponse(p) {
				if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
			}
			MsgBeginUnlockingResponse.prototype.success = false;
			MsgBeginUnlockingResponse.create = function create(properties) {
				return new MsgBeginUnlockingResponse(properties);
			};
			MsgBeginUnlockingResponse.encode = function encode(m, w) {
				if (!w) w = $Writer.create();
				if (m.success != null && Object.hasOwnProperty.call(m, 'success')) w.uint32(8).bool(m.success);
				return w;
			};
			MsgBeginUnlockingResponse.decode = function decode(r, l) {
				if (!(r instanceof $Reader)) r = $Reader.create(r);
				var c = l === undefined ? r.len : r.pos + l,
					m = new osmosis.lockup.MsgBeginUnlockingResponse();
				while (r.pos < c) {
					var t = r.uint32();
					switch (t >>> 3) {
						case 1:
							m.success = r.bool();
							break;
						default:
							r.skipType(t & 7);
							break;
					}
				}
				return m;
			};
			MsgBeginUnlockingResponse.fromObject = function fromObject(d) {
				if (d instanceof osmosis.lockup.MsgBeginUnlockingResponse) return d;
				var m = new osmosis.lockup.MsgBeginUnlockingResponse();
				if (d.success != null) {
					m.success = Boolean(d.success);
				}
				return m;
			};
			MsgBeginUnlockingResponse.toObject = function toObject(m, o) {
				if (!o) o = {};
				var d = {};
				if (o.defaults) {
					d.success = false;
				}
				if (m.success != null && m.hasOwnProperty('success')) {
					d.success = m.success;
				}
				return d;
			};
			MsgBeginUnlockingResponse.prototype.toJSON = function toJSON() {
				return this.constructor.toObject(this, protobuf.util.toJSONOptions);
			};
			return MsgBeginUnlockingResponse;
		})();
		return lockup;
	})();
	osmosis.incentives = (function() {
		const incentives = {};
		incentives.Msg = (function() {
			function Msg(rpcImpl, requestDelimited, responseDelimited) {
				protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
			}
			(Msg.prototype = Object.create(protobuf.rpc.Service.prototype)).constructor = Msg;
			Msg.create = function create(rpcImpl, requestDelimited, responseDelimited) {
				return new this(rpcImpl, requestDelimited, responseDelimited);
			};
			Object.defineProperty(
				(Msg.prototype.createGauge = function createGauge(request, callback) {
					return this.rpcCall(
						createGauge,
						osmosis.incentives.MsgCreateGauge,
						osmosis.incentives.MsgCreateGaugeResponse,
						request,
						callback
					);
				}),
				'name',
				{ value: 'CreateGauge' }
			);
			Object.defineProperty(
				(Msg.prototype.addToGauge = function addToGauge(request, callback) {
					return this.rpcCall(
						addToGauge,
						osmosis.incentives.MsgAddToGauge,
						osmosis.incentives.MsgAddToGaugeResponse,
						request,
						callback
					);
				}),
				'name',
				{ value: 'AddToGauge' }
			);
			return Msg;
		})();
		incentives.MsgCreateGauge = (function() {
			function MsgCreateGauge(p) {
				this.coins = [];
				if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
			}
			MsgCreateGauge.prototype.isPerpetual = false;
			MsgCreateGauge.prototype.owner = '';
			MsgCreateGauge.prototype.distributeTo = null;
			MsgCreateGauge.prototype.coins = $util.emptyArray;
			MsgCreateGauge.prototype.startTime = null;
			MsgCreateGauge.prototype.numEpochsPaidOver = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
			MsgCreateGauge.create = function create(properties) {
				return new MsgCreateGauge(properties);
			};
			MsgCreateGauge.encode = function encode(m, w) {
				if (!w) w = $Writer.create();
				if (m.isPerpetual != null && Object.hasOwnProperty.call(m, 'isPerpetual')) w.uint32(8).bool(m.isPerpetual);
				if (m.owner != null && Object.hasOwnProperty.call(m, 'owner')) w.uint32(18).string(m.owner);
				if (m.distributeTo != null && Object.hasOwnProperty.call(m, 'distributeTo'))
					osmosis.lockup.QueryCondition.encode(m.distributeTo, w.uint32(26).fork()).ldelim();
				if (m.coins != null && m.coins.length) {
					for (var i = 0; i < m.coins.length; ++i)
						cosmos.base.v1beta1.Coin.encode(m.coins[i], w.uint32(34).fork()).ldelim();
				}
				if (m.startTime != null && Object.hasOwnProperty.call(m, 'startTime'))
					google.protobuf.Timestamp.encode(m.startTime, w.uint32(42).fork()).ldelim();
				if (m.numEpochsPaidOver != null && Object.hasOwnProperty.call(m, 'numEpochsPaidOver'))
					w.uint32(48).uint64(m.numEpochsPaidOver);
				return w;
			};
			MsgCreateGauge.decode = function decode(r, l) {
				if (!(r instanceof $Reader)) r = $Reader.create(r);
				var c = l === undefined ? r.len : r.pos + l,
					m = new osmosis.incentives.MsgCreateGauge();
				while (r.pos < c) {
					var t = r.uint32();
					switch (t >>> 3) {
						case 1:
							m.isPerpetual = r.bool();
							break;
						case 2:
							m.owner = r.string();
							break;
						case 3:
							m.distributeTo = osmosis.lockup.QueryCondition.decode(r, r.uint32());
							break;
						case 4:
							if (!(m.coins && m.coins.length)) m.coins = [];
							m.coins.push(cosmos.base.v1beta1.Coin.decode(r, r.uint32()));
							break;
						case 5:
							m.startTime = google.protobuf.Timestamp.decode(r, r.uint32());
							break;
						case 6:
							m.numEpochsPaidOver = r.uint64();
							break;
						default:
							r.skipType(t & 7);
							break;
					}
				}
				return m;
			};
			MsgCreateGauge.fromObject = function fromObject(d) {
				if (d instanceof osmosis.incentives.MsgCreateGauge) return d;
				var m = new osmosis.incentives.MsgCreateGauge();
				if (d.isPerpetual != null) {
					m.isPerpetual = Boolean(d.isPerpetual);
				}
				if (d.owner != null) {
					m.owner = String(d.owner);
				}
				if (d.distributeTo != null) {
					if (typeof d.distributeTo !== 'object')
						throw TypeError('.osmosis.incentives.MsgCreateGauge.distributeTo: object expected');
					m.distributeTo = osmosis.lockup.QueryCondition.fromObject(d.distributeTo);
				}
				if (d.coins) {
					if (!Array.isArray(d.coins)) throw TypeError('.osmosis.incentives.MsgCreateGauge.coins: array expected');
					m.coins = [];
					for (var i = 0; i < d.coins.length; ++i) {
						if (typeof d.coins[i] !== 'object')
							throw TypeError('.osmosis.incentives.MsgCreateGauge.coins: object expected');
						m.coins[i] = cosmos.base.v1beta1.Coin.fromObject(d.coins[i]);
					}
				}
				if (d.startTime != null) {
					if (typeof d.startTime !== 'object')
						throw TypeError('.osmosis.incentives.MsgCreateGauge.startTime: object expected');
					m.startTime = google.protobuf.Timestamp.fromObject(d.startTime);
				}
				if (d.numEpochsPaidOver != null) {
					if ($util.Long) (m.numEpochsPaidOver = $util.Long.fromValue(d.numEpochsPaidOver)).unsigned = true;
					else if (typeof d.numEpochsPaidOver === 'string') m.numEpochsPaidOver = parseInt(d.numEpochsPaidOver, 10);
					else if (typeof d.numEpochsPaidOver === 'number') m.numEpochsPaidOver = d.numEpochsPaidOver;
					else if (typeof d.numEpochsPaidOver === 'object')
						m.numEpochsPaidOver = new $util.LongBits(
							d.numEpochsPaidOver.low >>> 0,
							d.numEpochsPaidOver.high >>> 0
						).toNumber(true);
				}
				return m;
			};
			MsgCreateGauge.toObject = function toObject(m, o) {
				if (!o) o = {};
				var d = {};
				if (o.arrays || o.defaults) {
					d.coins = [];
				}
				if (o.defaults) {
					d.isPerpetual = false;
					d.owner = '';
					d.distributeTo = null;
					d.startTime = null;
					if ($util.Long) {
						var n = new $util.Long(0, 0, true);
						d.numEpochsPaidOver = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
					} else d.numEpochsPaidOver = o.longs === String ? '0' : 0;
				}
				if (m.isPerpetual != null && m.hasOwnProperty('isPerpetual')) {
					d.isPerpetual = m.isPerpetual;
				}
				if (m.owner != null && m.hasOwnProperty('owner')) {
					d.owner = m.owner;
				}
				if (m.distributeTo != null && m.hasOwnProperty('distributeTo')) {
					d.distributeTo = osmosis.lockup.QueryCondition.toObject(m.distributeTo, o);
				}
				if (m.coins && m.coins.length) {
					d.coins = [];
					for (var j = 0; j < m.coins.length; ++j) {
						d.coins[j] = cosmos.base.v1beta1.Coin.toObject(m.coins[j], o);
					}
				}
				if (m.startTime != null && m.hasOwnProperty('startTime')) {
					d.startTime = google.protobuf.Timestamp.toObject(m.startTime, o);
				}
				if (m.numEpochsPaidOver != null && m.hasOwnProperty('numEpochsPaidOver')) {
					if (typeof m.numEpochsPaidOver === 'number')
						d.numEpochsPaidOver = o.longs === String ? String(m.numEpochsPaidOver) : m.numEpochsPaidOver;
					else
						d.numEpochsPaidOver =
							o.longs === String
								? $util.Long.prototype.toString.call(m.numEpochsPaidOver)
								: o.longs === Number
								? new $util.LongBits(m.numEpochsPaidOver.low >>> 0, m.numEpochsPaidOver.high >>> 0).toNumber(true)
								: m.numEpochsPaidOver;
				}
				return d;
			};
			MsgCreateGauge.prototype.toJSON = function toJSON() {
				return this.constructor.toObject(this, protobuf.util.toJSONOptions);
			};
			return MsgCreateGauge;
		})();
		incentives.MsgCreateGaugeResponse = (function() {
			function MsgCreateGaugeResponse(p) {
				if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
			}
			MsgCreateGaugeResponse.create = function create(properties) {
				return new MsgCreateGaugeResponse(properties);
			};
			MsgCreateGaugeResponse.encode = function encode(m, w) {
				if (!w) w = $Writer.create();
				return w;
			};
			MsgCreateGaugeResponse.decode = function decode(r, l) {
				if (!(r instanceof $Reader)) r = $Reader.create(r);
				var c = l === undefined ? r.len : r.pos + l,
					m = new osmosis.incentives.MsgCreateGaugeResponse();
				while (r.pos < c) {
					var t = r.uint32();
					switch (t >>> 3) {
						default:
							r.skipType(t & 7);
							break;
					}
				}
				return m;
			};
			MsgCreateGaugeResponse.fromObject = function fromObject(d) {
				if (d instanceof osmosis.incentives.MsgCreateGaugeResponse) return d;
				return new osmosis.incentives.MsgCreateGaugeResponse();
			};
			MsgCreateGaugeResponse.toObject = function toObject() {
				return {};
			};
			MsgCreateGaugeResponse.prototype.toJSON = function toJSON() {
				return this.constructor.toObject(this, protobuf.util.toJSONOptions);
			};
			return MsgCreateGaugeResponse;
		})();
		incentives.MsgAddToGauge = (function() {
			function MsgAddToGauge(p) {
				this.rewards = [];
				if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
			}
			MsgAddToGauge.prototype.owner = '';
			MsgAddToGauge.prototype.gaugeId = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
			MsgAddToGauge.prototype.rewards = $util.emptyArray;
			MsgAddToGauge.create = function create(properties) {
				return new MsgAddToGauge(properties);
			};
			MsgAddToGauge.encode = function encode(m, w) {
				if (!w) w = $Writer.create();
				if (m.owner != null && Object.hasOwnProperty.call(m, 'owner')) w.uint32(10).string(m.owner);
				if (m.gaugeId != null && Object.hasOwnProperty.call(m, 'gaugeId')) w.uint32(16).uint64(m.gaugeId);
				if (m.rewards != null && m.rewards.length) {
					for (var i = 0; i < m.rewards.length; ++i)
						cosmos.base.v1beta1.Coin.encode(m.rewards[i], w.uint32(26).fork()).ldelim();
				}
				return w;
			};
			MsgAddToGauge.decode = function decode(r, l) {
				if (!(r instanceof $Reader)) r = $Reader.create(r);
				var c = l === undefined ? r.len : r.pos + l,
					m = new osmosis.incentives.MsgAddToGauge();
				while (r.pos < c) {
					var t = r.uint32();
					switch (t >>> 3) {
						case 1:
							m.owner = r.string();
							break;
						case 2:
							m.gaugeId = r.uint64();
							break;
						case 3:
							if (!(m.rewards && m.rewards.length)) m.rewards = [];
							m.rewards.push(cosmos.base.v1beta1.Coin.decode(r, r.uint32()));
							break;
						default:
							r.skipType(t & 7);
							break;
					}
				}
				return m;
			};
			MsgAddToGauge.fromObject = function fromObject(d) {
				if (d instanceof osmosis.incentives.MsgAddToGauge) return d;
				var m = new osmosis.incentives.MsgAddToGauge();
				if (d.owner != null) {
					m.owner = String(d.owner);
				}
				if (d.gaugeId != null) {
					if ($util.Long) (m.gaugeId = $util.Long.fromValue(d.gaugeId)).unsigned = true;
					else if (typeof d.gaugeId === 'string') m.gaugeId = parseInt(d.gaugeId, 10);
					else if (typeof d.gaugeId === 'number') m.gaugeId = d.gaugeId;
					else if (typeof d.gaugeId === 'object')
						m.gaugeId = new $util.LongBits(d.gaugeId.low >>> 0, d.gaugeId.high >>> 0).toNumber(true);
				}
				if (d.rewards) {
					if (!Array.isArray(d.rewards)) throw TypeError('.osmosis.incentives.MsgAddToGauge.rewards: array expected');
					m.rewards = [];
					for (var i = 0; i < d.rewards.length; ++i) {
						if (typeof d.rewards[i] !== 'object')
							throw TypeError('.osmosis.incentives.MsgAddToGauge.rewards: object expected');
						m.rewards[i] = cosmos.base.v1beta1.Coin.fromObject(d.rewards[i]);
					}
				}
				return m;
			};
			MsgAddToGauge.toObject = function toObject(m, o) {
				if (!o) o = {};
				var d = {};
				if (o.arrays || o.defaults) {
					d.rewards = [];
				}
				if (o.defaults) {
					d.owner = '';
					if ($util.Long) {
						var n = new $util.Long(0, 0, true);
						d.gaugeId = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
					} else d.gaugeId = o.longs === String ? '0' : 0;
				}
				if (m.owner != null && m.hasOwnProperty('owner')) {
					d.owner = m.owner;
				}
				if (m.gaugeId != null && m.hasOwnProperty('gaugeId')) {
					if (typeof m.gaugeId === 'number') d.gaugeId = o.longs === String ? String(m.gaugeId) : m.gaugeId;
					else
						d.gaugeId =
							o.longs === String
								? $util.Long.prototype.toString.call(m.gaugeId)
								: o.longs === Number
								? new $util.LongBits(m.gaugeId.low >>> 0, m.gaugeId.high >>> 0).toNumber(true)
								: m.gaugeId;
				}
				if (m.rewards && m.rewards.length) {
					d.rewards = [];
					for (var j = 0; j < m.rewards.length; ++j) {
						d.rewards[j] = cosmos.base.v1beta1.Coin.toObject(m.rewards[j], o);
					}
				}
				return d;
			};
			MsgAddToGauge.prototype.toJSON = function toJSON() {
				return this.constructor.toObject(this, protobuf.util.toJSONOptions);
			};
			return MsgAddToGauge;
		})();
		incentives.MsgAddToGaugeResponse = (function() {
			function MsgAddToGaugeResponse(p) {
				if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
			}
			MsgAddToGaugeResponse.create = function create(properties) {
				return new MsgAddToGaugeResponse(properties);
			};
			MsgAddToGaugeResponse.encode = function encode(m, w) {
				if (!w) w = $Writer.create();
				return w;
			};
			MsgAddToGaugeResponse.decode = function decode(r, l) {
				if (!(r instanceof $Reader)) r = $Reader.create(r);
				var c = l === undefined ? r.len : r.pos + l,
					m = new osmosis.incentives.MsgAddToGaugeResponse();
				while (r.pos < c) {
					var t = r.uint32();
					switch (t >>> 3) {
						default:
							r.skipType(t & 7);
							break;
					}
				}
				return m;
			};
			MsgAddToGaugeResponse.fromObject = function fromObject(d) {
				if (d instanceof osmosis.incentives.MsgAddToGaugeResponse) return d;
				return new osmosis.incentives.MsgAddToGaugeResponse();
			};
			MsgAddToGaugeResponse.toObject = function toObject() {
				return {};
			};
			MsgAddToGaugeResponse.prototype.toJSON = function toJSON() {
				return this.constructor.toObject(this, protobuf.util.toJSONOptions);
			};
			return MsgAddToGaugeResponse;
		})();
		return incentives;
	})();
	osmosis.superfluid = (function() {
		const superfluid = {};
		superfluid.Msg = (function() {
			function Msg(rpcImpl, requestDelimited, responseDelimited) {
				protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
			}
			(Msg.prototype = Object.create(protobuf.rpc.Service.prototype)).constructor = Msg;
			Msg.create = function create(rpcImpl, requestDelimited, responseDelimited) {
				return new this(rpcImpl, requestDelimited, responseDelimited);
			};
			Object.defineProperty(
				(Msg.prototype.superfluidDelegate = function superfluidDelegate(request, callback) {
					return this.rpcCall(
						superfluidDelegate,
						osmosis.superfluid.MsgSuperfluidDelegate,
						osmosis.superfluid.MsgSuperfluidDelegateResponse,
						request,
						callback
					);
				}),
				'name',
				{ value: 'SuperfluidDelegate' }
			);
			Object.defineProperty(
				(Msg.prototype.superfluidUndelegate = function superfluidUndelegate(request, callback) {
					return this.rpcCall(
						superfluidUndelegate,
						osmosis.superfluid.MsgSuperfluidUndelegate,
						osmosis.superfluid.MsgSuperfluidUndelegateResponse,
						request,
						callback
					);
				}),
				'name',
				{ value: 'SuperfluidUndelegate' }
			);
			Object.defineProperty(
				(Msg.prototype.superfluidUnbondLock = function superfluidUnbondLock(request, callback) {
					return this.rpcCall(
						superfluidUnbondLock,
						osmosis.superfluid.MsgSuperfluidUnbondLock,
						osmosis.superfluid.MsgSuperfluidUnbondLockResponse,
						request,
						callback
					);
				}),
				'name',
				{ value: 'SuperfluidUnbondLock' }
			);
			Object.defineProperty(
				(Msg.prototype.lockAndSuperfluidDelegate = function lockAndSuperfluidDelegate(request, callback) {
					return this.rpcCall(
						lockAndSuperfluidDelegate,
						osmosis.superfluid.MsgLockAndSuperfluidDelegate,
						osmosis.superfluid.MsgLockAndSuperfluidDelegateResponse,
						request,
						callback
					);
				}),
				'name',
				{ value: 'LockAndSuperfluidDelegate' }
			);
			return Msg;
		})();
		superfluid.MsgSuperfluidDelegate = (function() {
			function MsgSuperfluidDelegate(p) {
				if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
			}
			MsgSuperfluidDelegate.prototype.sender = '';
			MsgSuperfluidDelegate.prototype.lockId = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
			MsgSuperfluidDelegate.prototype.valAddr = '';
			MsgSuperfluidDelegate.create = function create(properties) {
				return new MsgSuperfluidDelegate(properties);
			};
			MsgSuperfluidDelegate.encode = function encode(m, w) {
				if (!w) w = $Writer.create();
				if (m.sender != null && Object.hasOwnProperty.call(m, 'sender')) w.uint32(10).string(m.sender);
				if (m.lockId != null && Object.hasOwnProperty.call(m, 'lockId')) w.uint32(16).uint64(m.lockId);
				if (m.valAddr != null && Object.hasOwnProperty.call(m, 'valAddr')) w.uint32(26).string(m.valAddr);
				return w;
			};
			MsgSuperfluidDelegate.decode = function decode(r, l) {
				if (!(r instanceof $Reader)) r = $Reader.create(r);
				var c = l === undefined ? r.len : r.pos + l,
					m = new osmosis.superfluid.MsgSuperfluidDelegate();
				while (r.pos < c) {
					var t = r.uint32();
					switch (t >>> 3) {
						case 1:
							m.sender = r.string();
							break;
						case 2:
							m.lockId = r.uint64();
							break;
						case 3:
							m.valAddr = r.string();
							break;
						default:
							r.skipType(t & 7);
							break;
					}
				}
				return m;
			};
			MsgSuperfluidDelegate.fromObject = function fromObject(d) {
				if (d instanceof osmosis.superfluid.MsgSuperfluidDelegate) return d;
				var m = new osmosis.superfluid.MsgSuperfluidDelegate();
				if (d.sender != null) {
					m.sender = String(d.sender);
				}
				if (d.lockId != null) {
					if ($util.Long) (m.lockId = $util.Long.fromValue(d.lockId)).unsigned = true;
					else if (typeof d.lockId === 'string') m.lockId = parseInt(d.lockId, 10);
					else if (typeof d.lockId === 'number') m.lockId = d.lockId;
					else if (typeof d.lockId === 'object')
						m.lockId = new $util.LongBits(d.lockId.low >>> 0, d.lockId.high >>> 0).toNumber(true);
				}
				if (d.valAddr != null) {
					m.valAddr = String(d.valAddr);
				}
				return m;
			};
			MsgSuperfluidDelegate.toObject = function toObject(m, o) {
				if (!o) o = {};
				var d = {};
				if (o.defaults) {
					d.sender = '';
					if ($util.Long) {
						var n = new $util.Long(0, 0, true);
						d.lockId = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
					} else d.lockId = o.longs === String ? '0' : 0;
					d.valAddr = '';
				}
				if (m.sender != null && m.hasOwnProperty('sender')) {
					d.sender = m.sender;
				}
				if (m.lockId != null && m.hasOwnProperty('lockId')) {
					if (typeof m.lockId === 'number') d.lockId = o.longs === String ? String(m.lockId) : m.lockId;
					else
						d.lockId =
							o.longs === String
								? $util.Long.prototype.toString.call(m.lockId)
								: o.longs === Number
								? new $util.LongBits(m.lockId.low >>> 0, m.lockId.high >>> 0).toNumber(true)
								: m.lockId;
				}
				if (m.valAddr != null && m.hasOwnProperty('valAddr')) {
					d.valAddr = m.valAddr;
				}
				return d;
			};
			MsgSuperfluidDelegate.prototype.toJSON = function toJSON() {
				return this.constructor.toObject(this, protobuf.util.toJSONOptions);
			};
			return MsgSuperfluidDelegate;
		})();
		superfluid.MsgSuperfluidDelegateResponse = (function() {
			function MsgSuperfluidDelegateResponse(p) {
				if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
			}
			MsgSuperfluidDelegateResponse.create = function create(properties) {
				return new MsgSuperfluidDelegateResponse(properties);
			};
			MsgSuperfluidDelegateResponse.encode = function encode(m, w) {
				if (!w) w = $Writer.create();
				return w;
			};
			MsgSuperfluidDelegateResponse.decode = function decode(r, l) {
				if (!(r instanceof $Reader)) r = $Reader.create(r);
				var c = l === undefined ? r.len : r.pos + l,
					m = new osmosis.superfluid.MsgSuperfluidDelegateResponse();
				while (r.pos < c) {
					var t = r.uint32();
					switch (t >>> 3) {
						default:
							r.skipType(t & 7);
							break;
					}
				}
				return m;
			};
			MsgSuperfluidDelegateResponse.fromObject = function fromObject(d) {
				if (d instanceof osmosis.superfluid.MsgSuperfluidDelegateResponse) return d;
				return new osmosis.superfluid.MsgSuperfluidDelegateResponse();
			};
			MsgSuperfluidDelegateResponse.toObject = function toObject() {
				return {};
			};
			MsgSuperfluidDelegateResponse.prototype.toJSON = function toJSON() {
				return this.constructor.toObject(this, protobuf.util.toJSONOptions);
			};
			return MsgSuperfluidDelegateResponse;
		})();
		superfluid.MsgSuperfluidUndelegate = (function() {
			function MsgSuperfluidUndelegate(p) {
				if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
			}
			MsgSuperfluidUndelegate.prototype.sender = '';
			MsgSuperfluidUndelegate.prototype.lockId = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
			MsgSuperfluidUndelegate.create = function create(properties) {
				return new MsgSuperfluidUndelegate(properties);
			};
			MsgSuperfluidUndelegate.encode = function encode(m, w) {
				if (!w) w = $Writer.create();
				if (m.sender != null && Object.hasOwnProperty.call(m, 'sender')) w.uint32(10).string(m.sender);
				if (m.lockId != null && Object.hasOwnProperty.call(m, 'lockId')) w.uint32(16).uint64(m.lockId);
				return w;
			};
			MsgSuperfluidUndelegate.decode = function decode(r, l) {
				if (!(r instanceof $Reader)) r = $Reader.create(r);
				var c = l === undefined ? r.len : r.pos + l,
					m = new osmosis.superfluid.MsgSuperfluidUndelegate();
				while (r.pos < c) {
					var t = r.uint32();
					switch (t >>> 3) {
						case 1:
							m.sender = r.string();
							break;
						case 2:
							m.lockId = r.uint64();
							break;
						default:
							r.skipType(t & 7);
							break;
					}
				}
				return m;
			};
			MsgSuperfluidUndelegate.fromObject = function fromObject(d) {
				if (d instanceof osmosis.superfluid.MsgSuperfluidUndelegate) return d;
				var m = new osmosis.superfluid.MsgSuperfluidUndelegate();
				if (d.sender != null) {
					m.sender = String(d.sender);
				}
				if (d.lockId != null) {
					if ($util.Long) (m.lockId = $util.Long.fromValue(d.lockId)).unsigned = true;
					else if (typeof d.lockId === 'string') m.lockId = parseInt(d.lockId, 10);
					else if (typeof d.lockId === 'number') m.lockId = d.lockId;
					else if (typeof d.lockId === 'object')
						m.lockId = new $util.LongBits(d.lockId.low >>> 0, d.lockId.high >>> 0).toNumber(true);
				}
				return m;
			};
			MsgSuperfluidUndelegate.toObject = function toObject(m, o) {
				if (!o) o = {};
				var d = {};
				if (o.defaults) {
					d.sender = '';
					if ($util.Long) {
						var n = new $util.Long(0, 0, true);
						d.lockId = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
					} else d.lockId = o.longs === String ? '0' : 0;
				}
				if (m.sender != null && m.hasOwnProperty('sender')) {
					d.sender = m.sender;
				}
				if (m.lockId != null && m.hasOwnProperty('lockId')) {
					if (typeof m.lockId === 'number') d.lockId = o.longs === String ? String(m.lockId) : m.lockId;
					else
						d.lockId =
							o.longs === String
								? $util.Long.prototype.toString.call(m.lockId)
								: o.longs === Number
								? new $util.LongBits(m.lockId.low >>> 0, m.lockId.high >>> 0).toNumber(true)
								: m.lockId;
				}
				return d;
			};
			MsgSuperfluidUndelegate.prototype.toJSON = function toJSON() {
				return this.constructor.toObject(this, protobuf.util.toJSONOptions);
			};
			return MsgSuperfluidUndelegate;
		})();
		superfluid.MsgSuperfluidUndelegateResponse = (function() {
			function MsgSuperfluidUndelegateResponse(p) {
				if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
			}
			MsgSuperfluidUndelegateResponse.create = function create(properties) {
				return new MsgSuperfluidUndelegateResponse(properties);
			};
			MsgSuperfluidUndelegateResponse.encode = function encode(m, w) {
				if (!w) w = $Writer.create();
				return w;
			};
			MsgSuperfluidUndelegateResponse.decode = function decode(r, l) {
				if (!(r instanceof $Reader)) r = $Reader.create(r);
				var c = l === undefined ? r.len : r.pos + l,
					m = new osmosis.superfluid.MsgSuperfluidUndelegateResponse();
				while (r.pos < c) {
					var t = r.uint32();
					switch (t >>> 3) {
						default:
							r.skipType(t & 7);
							break;
					}
				}
				return m;
			};
			MsgSuperfluidUndelegateResponse.fromObject = function fromObject(d) {
				if (d instanceof osmosis.superfluid.MsgSuperfluidUndelegateResponse) return d;
				return new osmosis.superfluid.MsgSuperfluidUndelegateResponse();
			};
			MsgSuperfluidUndelegateResponse.toObject = function toObject() {
				return {};
			};
			MsgSuperfluidUndelegateResponse.prototype.toJSON = function toJSON() {
				return this.constructor.toObject(this, protobuf.util.toJSONOptions);
			};
			return MsgSuperfluidUndelegateResponse;
		})();
		superfluid.MsgSuperfluidUnbondLock = (function() {
			function MsgSuperfluidUnbondLock(p) {
				if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
			}
			MsgSuperfluidUnbondLock.prototype.sender = '';
			MsgSuperfluidUnbondLock.prototype.lockId = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
			MsgSuperfluidUnbondLock.create = function create(properties) {
				return new MsgSuperfluidUnbondLock(properties);
			};
			MsgSuperfluidUnbondLock.encode = function encode(m, w) {
				if (!w) w = $Writer.create();
				if (m.sender != null && Object.hasOwnProperty.call(m, 'sender')) w.uint32(10).string(m.sender);
				if (m.lockId != null && Object.hasOwnProperty.call(m, 'lockId')) w.uint32(16).uint64(m.lockId);
				return w;
			};
			MsgSuperfluidUnbondLock.decode = function decode(r, l) {
				if (!(r instanceof $Reader)) r = $Reader.create(r);
				var c = l === undefined ? r.len : r.pos + l,
					m = new osmosis.superfluid.MsgSuperfluidUnbondLock();
				while (r.pos < c) {
					var t = r.uint32();
					switch (t >>> 3) {
						case 1:
							m.sender = r.string();
							break;
						case 2:
							m.lockId = r.uint64();
							break;
						default:
							r.skipType(t & 7);
							break;
					}
				}
				return m;
			};
			MsgSuperfluidUnbondLock.fromObject = function fromObject(d) {
				if (d instanceof osmosis.superfluid.MsgSuperfluidUnbondLock) return d;
				var m = new osmosis.superfluid.MsgSuperfluidUnbondLock();
				if (d.sender != null) {
					m.sender = String(d.sender);
				}
				if (d.lockId != null) {
					if ($util.Long) (m.lockId = $util.Long.fromValue(d.lockId)).unsigned = true;
					else if (typeof d.lockId === 'string') m.lockId = parseInt(d.lockId, 10);
					else if (typeof d.lockId === 'number') m.lockId = d.lockId;
					else if (typeof d.lockId === 'object')
						m.lockId = new $util.LongBits(d.lockId.low >>> 0, d.lockId.high >>> 0).toNumber(true);
				}
				return m;
			};
			MsgSuperfluidUnbondLock.toObject = function toObject(m, o) {
				if (!o) o = {};
				var d = {};
				if (o.defaults) {
					d.sender = '';
					if ($util.Long) {
						var n = new $util.Long(0, 0, true);
						d.lockId = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
					} else d.lockId = o.longs === String ? '0' : 0;
				}
				if (m.sender != null && m.hasOwnProperty('sender')) {
					d.sender = m.sender;
				}
				if (m.lockId != null && m.hasOwnProperty('lockId')) {
					if (typeof m.lockId === 'number') d.lockId = o.longs === String ? String(m.lockId) : m.lockId;
					else
						d.lockId =
							o.longs === String
								? $util.Long.prototype.toString.call(m.lockId)
								: o.longs === Number
								? new $util.LongBits(m.lockId.low >>> 0, m.lockId.high >>> 0).toNumber(true)
								: m.lockId;
				}
				return d;
			};
			MsgSuperfluidUnbondLock.prototype.toJSON = function toJSON() {
				return this.constructor.toObject(this, protobuf.util.toJSONOptions);
			};
			return MsgSuperfluidUnbondLock;
		})();
		superfluid.MsgSuperfluidUnbondLockResponse = (function() {
			function MsgSuperfluidUnbondLockResponse(p) {
				if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
			}
			MsgSuperfluidUnbondLockResponse.create = function create(properties) {
				return new MsgSuperfluidUnbondLockResponse(properties);
			};
			MsgSuperfluidUnbondLockResponse.encode = function encode(m, w) {
				if (!w) w = $Writer.create();
				return w;
			};
			MsgSuperfluidUnbondLockResponse.decode = function decode(r, l) {
				if (!(r instanceof $Reader)) r = $Reader.create(r);
				var c = l === undefined ? r.len : r.pos + l,
					m = new osmosis.superfluid.MsgSuperfluidUnbondLockResponse();
				while (r.pos < c) {
					var t = r.uint32();
					switch (t >>> 3) {
						default:
							r.skipType(t & 7);
							break;
					}
				}
				return m;
			};
			MsgSuperfluidUnbondLockResponse.fromObject = function fromObject(d) {
				if (d instanceof osmosis.superfluid.MsgSuperfluidUnbondLockResponse) return d;
				return new osmosis.superfluid.MsgSuperfluidUnbondLockResponse();
			};
			MsgSuperfluidUnbondLockResponse.toObject = function toObject() {
				return {};
			};
			MsgSuperfluidUnbondLockResponse.prototype.toJSON = function toJSON() {
				return this.constructor.toObject(this, protobuf.util.toJSONOptions);
			};
			return MsgSuperfluidUnbondLockResponse;
		})();
		superfluid.MsgLockAndSuperfluidDelegate = (function() {
			function MsgLockAndSuperfluidDelegate(p) {
				this.coins = [];
				if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
			}
			MsgLockAndSuperfluidDelegate.prototype.sender = '';
			MsgLockAndSuperfluidDelegate.prototype.coins = $util.emptyArray;
			MsgLockAndSuperfluidDelegate.prototype.valAddr = '';
			MsgLockAndSuperfluidDelegate.create = function create(properties) {
				return new MsgLockAndSuperfluidDelegate(properties);
			};
			MsgLockAndSuperfluidDelegate.encode = function encode(m, w) {
				if (!w) w = $Writer.create();
				if (m.sender != null && Object.hasOwnProperty.call(m, 'sender')) w.uint32(10).string(m.sender);
				if (m.coins != null && m.coins.length) {
					for (var i = 0; i < m.coins.length; ++i)
						cosmos.base.v1beta1.Coin.encode(m.coins[i], w.uint32(18).fork()).ldelim();
				}
				if (m.valAddr != null && Object.hasOwnProperty.call(m, 'valAddr')) w.uint32(26).string(m.valAddr);
				return w;
			};
			MsgLockAndSuperfluidDelegate.decode = function decode(r, l) {
				if (!(r instanceof $Reader)) r = $Reader.create(r);
				var c = l === undefined ? r.len : r.pos + l,
					m = new osmosis.superfluid.MsgLockAndSuperfluidDelegate();
				while (r.pos < c) {
					var t = r.uint32();
					switch (t >>> 3) {
						case 1:
							m.sender = r.string();
							break;
						case 2:
							if (!(m.coins && m.coins.length)) m.coins = [];
							m.coins.push(cosmos.base.v1beta1.Coin.decode(r, r.uint32()));
							break;
						case 3:
							m.valAddr = r.string();
							break;
						default:
							r.skipType(t & 7);
							break;
					}
				}
				return m;
			};
			MsgLockAndSuperfluidDelegate.fromObject = function fromObject(d) {
				if (d instanceof osmosis.superfluid.MsgLockAndSuperfluidDelegate) return d;
				var m = new osmosis.superfluid.MsgLockAndSuperfluidDelegate();
				if (d.sender != null) {
					m.sender = String(d.sender);
				}
				if (d.coins) {
					if (!Array.isArray(d.coins))
						throw TypeError('.osmosis.superfluid.MsgLockAndSuperfluidDelegate.coins: array expected');
					m.coins = [];
					for (var i = 0; i < d.coins.length; ++i) {
						if (typeof d.coins[i] !== 'object')
							throw TypeError('.osmosis.superfluid.MsgLockAndSuperfluidDelegate.coins: object expected');
						m.coins[i] = cosmos.base.v1beta1.Coin.fromObject(d.coins[i]);
					}
				}
				if (d.valAddr != null) {
					m.valAddr = String(d.valAddr);
				}
				return m;
			};
			MsgLockAndSuperfluidDelegate.toObject = function toObject(m, o) {
				if (!o) o = {};
				var d = {};
				if (o.arrays || o.defaults) {
					d.coins = [];
				}
				if (o.defaults) {
					d.sender = '';
					d.valAddr = '';
				}
				if (m.sender != null && m.hasOwnProperty('sender')) {
					d.sender = m.sender;
				}
				if (m.coins && m.coins.length) {
					d.coins = [];
					for (var j = 0; j < m.coins.length; ++j) {
						d.coins[j] = cosmos.base.v1beta1.Coin.toObject(m.coins[j], o);
					}
				}
				if (m.valAddr != null && m.hasOwnProperty('valAddr')) {
					d.valAddr = m.valAddr;
				}
				return d;
			};
			MsgLockAndSuperfluidDelegate.prototype.toJSON = function toJSON() {
				return this.constructor.toObject(this, protobuf.util.toJSONOptions);
			};
			return MsgLockAndSuperfluidDelegate;
		})();
		superfluid.MsgLockAndSuperfluidDelegateResponse = (function() {
			function MsgLockAndSuperfluidDelegateResponse(p) {
				if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
			}
			MsgLockAndSuperfluidDelegateResponse.prototype.ID = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
			MsgLockAndSuperfluidDelegateResponse.create = function create(properties) {
				return new MsgLockAndSuperfluidDelegateResponse(properties);
			};
			MsgLockAndSuperfluidDelegateResponse.encode = function encode(m, w) {
				if (!w) w = $Writer.create();
				if (m.ID != null && Object.hasOwnProperty.call(m, 'ID')) w.uint32(8).uint64(m.ID);
				return w;
			};
			MsgLockAndSuperfluidDelegateResponse.decode = function decode(r, l) {
				if (!(r instanceof $Reader)) r = $Reader.create(r);
				var c = l === undefined ? r.len : r.pos + l,
					m = new osmosis.superfluid.MsgLockAndSuperfluidDelegateResponse();
				while (r.pos < c) {
					var t = r.uint32();
					switch (t >>> 3) {
						case 1:
							m.ID = r.uint64();
							break;
						default:
							r.skipType(t & 7);
							break;
					}
				}
				return m;
			};
			MsgLockAndSuperfluidDelegateResponse.fromObject = function fromObject(d) {
				if (d instanceof osmosis.superfluid.MsgLockAndSuperfluidDelegateResponse) return d;
				var m = new osmosis.superfluid.MsgLockAndSuperfluidDelegateResponse();
				if (d.ID != null) {
					if ($util.Long) (m.ID = $util.Long.fromValue(d.ID)).unsigned = true;
					else if (typeof d.ID === 'string') m.ID = parseInt(d.ID, 10);
					else if (typeof d.ID === 'number') m.ID = d.ID;
					else if (typeof d.ID === 'object') m.ID = new $util.LongBits(d.ID.low >>> 0, d.ID.high >>> 0).toNumber(true);
				}
				return m;
			};
			MsgLockAndSuperfluidDelegateResponse.toObject = function toObject(m, o) {
				if (!o) o = {};
				var d = {};
				if (o.defaults) {
					if ($util.Long) {
						var n = new $util.Long(0, 0, true);
						d.ID = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
					} else d.ID = o.longs === String ? '0' : 0;
				}
				if (m.ID != null && m.hasOwnProperty('ID')) {
					if (typeof m.ID === 'number') d.ID = o.longs === String ? String(m.ID) : m.ID;
					else
						d.ID =
							o.longs === String
								? $util.Long.prototype.toString.call(m.ID)
								: o.longs === Number
								? new $util.LongBits(m.ID.low >>> 0, m.ID.high >>> 0).toNumber(true)
								: m.ID;
				}
				return d;
			};
			MsgLockAndSuperfluidDelegateResponse.prototype.toJSON = function toJSON() {
				return this.constructor.toObject(this, protobuf.util.toJSONOptions);
			};
			return MsgLockAndSuperfluidDelegateResponse;
		})();
		return superfluid;
	})();
	return osmosis;
})();
export const google = (() => {
	const google = {};
	google.protobuf = (function() {
		const protobuf = {};
		protobuf.Duration = (function() {
			function Duration(p) {
				if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
			}
			Duration.prototype.seconds = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
			Duration.prototype.nanos = 0;
			Duration.create = function create(properties) {
				return new Duration(properties);
			};
			Duration.encode = function encode(m, w) {
				if (!w) w = $Writer.create();
				if (m.seconds != null && Object.hasOwnProperty.call(m, 'seconds')) w.uint32(8).int64(m.seconds);
				if (m.nanos != null && Object.hasOwnProperty.call(m, 'nanos')) w.uint32(16).int32(m.nanos);
				return w;
			};
			Duration.decode = function decode(r, l) {
				if (!(r instanceof $Reader)) r = $Reader.create(r);
				var c = l === undefined ? r.len : r.pos + l,
					m = new google.protobuf.Duration();
				while (r.pos < c) {
					var t = r.uint32();
					switch (t >>> 3) {
						case 1:
							m.seconds = r.int64();
							break;
						case 2:
							m.nanos = r.int32();
							break;
						default:
							r.skipType(t & 7);
							break;
					}
				}
				return m;
			};
			Duration.fromObject = function fromObject(d) {
				if (d instanceof google.protobuf.Duration) return d;
				var m = new google.protobuf.Duration();
				if (d.seconds != null) {
					if ($util.Long) (m.seconds = $util.Long.fromValue(d.seconds)).unsigned = false;
					else if (typeof d.seconds === 'string') m.seconds = parseInt(d.seconds, 10);
					else if (typeof d.seconds === 'number') m.seconds = d.seconds;
					else if (typeof d.seconds === 'object')
						m.seconds = new $util.LongBits(d.seconds.low >>> 0, d.seconds.high >>> 0).toNumber();
				}
				if (d.nanos != null) {
					m.nanos = d.nanos | 0;
				}
				return m;
			};
			Duration.toObject = function toObject(m, o) {
				if (!o) o = {};
				var d = {};
				if (o.defaults) {
					if ($util.Long) {
						var n = new $util.Long(0, 0, false);
						d.seconds = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
					} else d.seconds = o.longs === String ? '0' : 0;
					d.nanos = 0;
				}
				if (m.seconds != null && m.hasOwnProperty('seconds')) {
					if (typeof m.seconds === 'number') d.seconds = o.longs === String ? String(m.seconds) : m.seconds;
					else
						d.seconds =
							o.longs === String
								? $util.Long.prototype.toString.call(m.seconds)
								: o.longs === Number
								? new $util.LongBits(m.seconds.low >>> 0, m.seconds.high >>> 0).toNumber()
								: m.seconds;
				}
				if (m.nanos != null && m.hasOwnProperty('nanos')) {
					d.nanos = m.nanos;
				}
				return d;
			};
			Duration.prototype.toJSON = function toJSON() {
				return this.constructor.toObject(this, protobuf.util.toJSONOptions);
			};
			return Duration;
		})();
		protobuf.Timestamp = (function() {
			function Timestamp(p) {
				if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
			}
			Timestamp.prototype.seconds = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
			Timestamp.prototype.nanos = 0;
			Timestamp.create = function create(properties) {
				return new Timestamp(properties);
			};
			Timestamp.encode = function encode(m, w) {
				if (!w) w = $Writer.create();
				if (m.seconds != null && Object.hasOwnProperty.call(m, 'seconds')) w.uint32(8).int64(m.seconds);
				if (m.nanos != null && Object.hasOwnProperty.call(m, 'nanos')) w.uint32(16).int32(m.nanos);
				return w;
			};
			Timestamp.decode = function decode(r, l) {
				if (!(r instanceof $Reader)) r = $Reader.create(r);
				var c = l === undefined ? r.len : r.pos + l,
					m = new google.protobuf.Timestamp();
				while (r.pos < c) {
					var t = r.uint32();
					switch (t >>> 3) {
						case 1:
							m.seconds = r.int64();
							break;
						case 2:
							m.nanos = r.int32();
							break;
						default:
							r.skipType(t & 7);
							break;
					}
				}
				return m;
			};
			Timestamp.fromObject = function fromObject(d) {
				if (d instanceof google.protobuf.Timestamp) return d;
				var m = new google.protobuf.Timestamp();
				if (d.seconds != null) {
					if ($util.Long) (m.seconds = $util.Long.fromValue(d.seconds)).unsigned = false;
					else if (typeof d.seconds === 'string') m.seconds = parseInt(d.seconds, 10);
					else if (typeof d.seconds === 'number') m.seconds = d.seconds;
					else if (typeof d.seconds === 'object')
						m.seconds = new $util.LongBits(d.seconds.low >>> 0, d.seconds.high >>> 0).toNumber();
				}
				if (d.nanos != null) {
					m.nanos = d.nanos | 0;
				}
				return m;
			};
			Timestamp.toObject = function toObject(m, o) {
				if (!o) o = {};
				var d = {};
				if (o.defaults) {
					if ($util.Long) {
						var n = new $util.Long(0, 0, false);
						d.seconds = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
					} else d.seconds = o.longs === String ? '0' : 0;
					d.nanos = 0;
				}
				if (m.seconds != null && m.hasOwnProperty('seconds')) {
					if (typeof m.seconds === 'number') d.seconds = o.longs === String ? String(m.seconds) : m.seconds;
					else
						d.seconds =
							o.longs === String
								? $util.Long.prototype.toString.call(m.seconds)
								: o.longs === Number
								? new $util.LongBits(m.seconds.low >>> 0, m.seconds.high >>> 0).toNumber()
								: m.seconds;
				}
				if (m.nanos != null && m.hasOwnProperty('nanos')) {
					d.nanos = m.nanos;
				}
				return d;
			};
			Timestamp.prototype.toJSON = function toJSON() {
				return this.constructor.toObject(this, protobuf.util.toJSONOptions);
			};
			return Timestamp;
		})();
		return protobuf;
	})();
	return google;
})();

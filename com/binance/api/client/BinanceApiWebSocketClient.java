package com.binance.api.client;

import com.binance.api.client.domain.event.AggTradeEvent;
import com.binance.api.client.domain.event.CandlestickEvent;
import com.binance.api.client.domain.event.DepthEvent;
import com.binance.api.client.domain.event.UserDataUpdateEvent;
import com.binance.api.client.domain.market.Candlestick;
import com.binance.api.client.domain.market.CandlestickInterval;
import java.io.IOException;
import okhttp3.OkHttpClient;
import okhttp3.Request;
/**
 * Binance API data streaming façade, supporting streaming of events through web sockets.
 */
public interface BinanceApiWebSocketClient {

  void onDepthEvent(String symbol, BinanceApiCallback<DepthEvent> callback);

  void onCandlestickEvent(String symbol, CandlestickInterval interval, BinanceApiCallback<CandlestickEvent> callback);

  void onAggTradeEvent(String symbol, BinanceApiCallback<AggTradeEvent> callback);

  void onUserDataUpdateEvent(String listenKey, BinanceApiCallback<UserDataUpdateEvent> callback);
  OkHttpClient  getBWSClient();
  Request getBWSRequest(); 
  void doKill();
}

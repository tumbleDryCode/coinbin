package com.binance.api.client.impl;

import com.binance.api.client.BinanceApiCallback;
import com.binance.api.client.BinanceApiWebSocketClient;
import com.binance.api.client.constant.BinanceApiConstants;
import com.binance.api.client.domain.event.AggTradeEvent;
import com.binance.api.client.domain.event.CandlestickEvent;
import com.binance.api.client.domain.event.DepthEvent;
import com.binance.api.client.domain.event.UserDataUpdateEvent;
import com.binance.api.client.domain.market.CandlestickInterval;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.WebSocket;
import java.io.Closeable;
import java.io.IOException;

/**
 * Binance API WebSocket client implementation using OkHttp.
 */
public class BinanceApiWebSocketClientImpl implements BinanceApiWebSocketClient, Closeable {

  OkHttpClient client;
	Request request;
	WebSocket wbsKtDepth;
	WebSocket wbsKtAggTrade;
	WebSocket wbsKtCndl;
	WebSocket wbsKtUdata;
  public BinanceApiWebSocketClientImpl() {
    this.client = new OkHttpClient();
  }
  public Request getBWSRequest() {
	return request;
 }
  public OkHttpClient getBWSClient() {
	return this.client;
 }

  public void doKill() {
             System.out.println("doKill: BinanceApiWebSocketClientImpl!!!!: ");
	try {

    this.client.dispatcher().executorService().shutdown();
	this.client.connectionPool().evictAll();
	if(this.wbsKtDepth != null)
	this.wbsKtDepth.close(1000, null);
	if(this.wbsKtAggTrade != null)
	this.wbsKtAggTrade.close(1000, null);
	if(this.wbsKtCndl != null)
	this.wbsKtCndl.close(1000, null);
      close();
	} catch(Exception ew) {
	ew.printStackTrace();
	}
 }


  public void onDepthEvent(String symbol, BinanceApiCallback<DepthEvent> callback) {
    final String channel = String.format("%s@depth", symbol);
    wbsKtDepth = createANewWebSocket(channel, new BinanceApiWebSocketListener<>(callback, DepthEvent.class));
  }

  @Override
  public void onCandlestickEvent(String symbol, CandlestickInterval interval, BinanceApiCallback<CandlestickEvent> callback) {
    final String channel = String.format("%s@kline_%s", symbol, interval.getIntervalId());
    wbsKtCndl = createANewWebSocket(channel, new BinanceApiWebSocketListener<>(callback, CandlestickEvent.class));
  }

  public void onAggTradeEvent(String symbol, BinanceApiCallback<AggTradeEvent> callback) {
    final String channel = String.format("%s@aggTrade", symbol);
    wbsKtAggTrade = createANewWebSocket(channel, new BinanceApiWebSocketListener<>(callback, AggTradeEvent.class));
  }

  public void onUserDataUpdateEvent(String listenKey, BinanceApiCallback<UserDataUpdateEvent> callback) {
    createNewWebSocket(wbsKtUdata, listenKey, new BinanceApiWebSocketListener<>(callback, UserDataUpdateEvent.class));
  }
 


  public WebSocket createANewWebSocket(String channel, BinanceApiWebSocketListener<?> listener) {
    String streamingUrl = String.format("%s/%s", BinanceApiConstants.WS_API_BASE_URL, channel);
    request = new Request.Builder().url(streamingUrl).build();
    WebSocket wsk = client.newWebSocket(request, listener);
    return wsk;
  }



  private void createNewWebSocket(WebSocket wsk, String channel, BinanceApiWebSocketListener<?> listener) {
    String streamingUrl = String.format("%s/%s", BinanceApiConstants.WS_API_BASE_URL, channel);
    request = new Request.Builder().url(streamingUrl).build();
    wsk = client.newWebSocket(request, listener);
  }

  @Override
  public void close() throws IOException {
    client.dispatcher().executorService().shutdown();
  }
}

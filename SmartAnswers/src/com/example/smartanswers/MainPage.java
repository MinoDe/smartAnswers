package com.example.smartanswers;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;

import com.example.smartanswers.util.SystemUiHider;

import android.annotation.TargetApi;
import android.app.Activity;
import android.opengl.Visibility;
import android.os.AsyncTask;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.RadioButton;
import android.widget.TextView;

/**
 * An example full-screen activity that shows and hides the system UI (i.e.
 * status bar and navigation/system bar) with user interaction.
 * 
 * @see SystemUiHider
 */
public class MainPage extends Activity {

	int count = 0;
	TextView que;
	RadioButton opt1;
	RadioButton opt2;
	RadioButton opt3;
	RadioButton opt4;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		setContentView(R.layout.activity_main_page);

		Button submit = (Button) findViewById(R.id.submit_button);

		que = (TextView) findViewById(R.id.question);
		opt1 = (RadioButton) findViewById(R.id.radioButton1);
		opt2 = (RadioButton) findViewById(R.id.radioButton2);
		opt3 = (RadioButton) findViewById(R.id.radioButton3);
		opt4 = (RadioButton) findViewById(R.id.radioButton4);
		final TextView check = (TextView) findViewById(R.id.check);

		new DownloadFilesTask().execute();
		submit.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				check.setVisibility(View.VISIBLE);
			}
		});

	}

	private class DownloadFilesTask extends AsyncTask<URL, Integer, Long> {
		protected Long doInBackground(URL... urls) {
			HttpClient httpClient = new DefaultHttpClient();
			HttpPost httpPost = new HttpPost(
					"http://192.168.1.108:3000/question");

			List<NameValuePair> nameValuePair = new ArrayList<NameValuePair>(2);
			nameValuePair.add(new BasicNameValuePair("id", "" + count));

			// Encoding POST data
			try {
				httpPost.setEntity(new UrlEncodedFormEntity(nameValuePair));

			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}

			try {
				HttpResponse response = httpClient.execute(httpPost);
				// write response to log
				Log.d("Http Post Response:", response.toString());
				response.getParams().getParameter("q");
				que.setText("" + response.getParams().getParameter("q"));
				opt1.setText("" + response.getParams().getParameter("a"));
				opt2.setText("" + response.getParams().getParameter("b"));
				opt3.setText("" + response.getParams().getParameter("c"));
				opt4.setText("" + response.getParams().getParameter("d"));

			} catch (ClientProtocolException e) {
				// Log exception
				e.printStackTrace();
			} catch (IOException e) {
				// Log exception
				e.printStackTrace();
			}

			return null;
		}

		protected void onProgressUpdate(Integer... progress) {
		}

		protected void onPostExecute(Long result) {
		}
	}

}

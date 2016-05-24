package com.muzavan.userpc.cityplanner;

import android.content.Intent;
import android.os.CountDownTimer;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import java.util.TimerTask;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        getActionBar().hide();

        CountDownTimer countDown = new CountDownTimer(2000,1000) {
            // First Parameter : set countdown to 2 s
            // Second Parameter : onTick called every 1 s
            @Override
            public void onTick(long millisUntilFinished) {
                // do nothing
            }

            @Override
            public void onFinish() {
                Intent intent = new Intent(MainActivity.this, ModeActivity.class);
                startActivity(intent);
                finish();
            }
        };

        countDown.start();
    }
}

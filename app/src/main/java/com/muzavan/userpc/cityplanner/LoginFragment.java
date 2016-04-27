package com.muzavan.userpc.cityplanner;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

/**
 * Created by user pc on 4/27/2016.
 */
public class LoginFragment extends Fragment {

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View out = inflater.inflate(R.layout.fragment_login,container,false);
        // TODO : Add Interactive Button
        final EditText loginEmail = (EditText) out.findViewById(R.id.login_email);
        final EditText loginPassword = (EditText) out.findViewById(R.id.login_password);
        Button loginButton = (Button) out.findViewById(R.id.login_button);
        loginButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String email = loginEmail.getText().toString();
                String password = loginPassword.getText().toString();
                if(email == "" || password == ""){
                    Toast.makeText(getContext(), "Please fill your email and password first!", Toast.LENGTH_SHORT).show();
                }else{
                    Toast.makeText(getContext(), "Login!", Toast.LENGTH_SHORT).show();
                }

            }
        });
        return out;
    }
}
